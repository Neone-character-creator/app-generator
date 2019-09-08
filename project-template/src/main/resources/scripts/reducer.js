import * as _ from "lodash";
import models from "./models";
import interpreter from "./interpreter";
import rules from "!./rules.json";
import hooks from "!./hooks.json";

const baseValues = {};

function setCalculatedProperties(modelDefinition, ancestorDefinitions, state, statePath) {
    const joinedStatePath = statePath[0] + statePath.slice(1).map(element => `[${element}]`).join("");
    if (modelDefinition.baseValue) {
        const originalBaseValue = _.get(baseValues, joinedStatePath) || 0;
        const differenceFromOriginalBase = (_.get(state, joinedStatePath) - originalBaseValue) || 0;
        const baseValue = modelDefinition.baseValue.reduce((accumulator, nextExpression) => {
            return interpreter.interpret(nextExpression, {$state: state, $models: models, $this: accumulator}, true)
                || accumulator;
        }, 0);
        if (originalBaseValue !== baseValue) {
            _.set(baseValues, joinedStatePath, baseValue);
        }
        _.set(state, joinedStatePath, baseValue + differenceFromOriginalBase);
    } else if (modelDefinition.derivedFrom) {
        let value = modelDefinition.derivedFrom.reduce((accumulator, nextExpression) => {
            return interpreter.interpret(nextExpression, {
                $state: state, $models: models,
                $this: {
                    accumulator,
                    ancestors: statePath.filter((x, i) => i < statePath.length - 1).map((element, index) => {
                        const joined = statePath.filter((x, i) => {
                            return i <= index;
                        }).map(x => `[${x}]`).join("");
                        return _.get(state, joined);
                    }).reverse()
                }
            })
        }, null);
        _.set(state, joinedStatePath, value);
    }
    Object.getOwnPropertyNames(modelDefinition).reduce((updated, nextPropertyName) => {
        const parentScopes = ancestorDefinitions ? [...ancestorDefinitions, modelDefinition] : [modelDefinition];
        const modelProperty = modelDefinition[nextPropertyName];
        const propertyModelDefinition = models[modelDefinition[nextPropertyName].type] ? models[modelDefinition[nextPropertyName].type].prototype.definition : undefined;
        const propertyPath = [...statePath, `${nextPropertyName}`];
        if (modelProperty.derivedFrom || modelProperty.baseValue) {
            setCalculatedProperties(modelProperty, parentScopes, state, propertyPath);
        } else if (propertyModelDefinition) {
            setCalculatedProperties(propertyModelDefinition, parentScopes, state, propertyPath);
        }
    }, state);
}

function setAvailableAdvancements(state) {
    const sharedContext = {
        $state: state,
        $model: models,
    };
    state.availableAdvancements = Object.keys(rules.advancement).reduce((advancements, availableAdvancementType) => {
        const advancementRule = rules.advancement[availableAdvancementType];
        let concreteOptions;
        if (typeof advancementRule.options === "string") {
            concreteOptions = interpreter.interpret(advancementRule.options, sharedContext);
        } else {
            concreteOptions = advancementRule.options;
        }
        concreteOptions = concreteOptions.map(option => {
            const localContext = {...sharedContext, $this: option};
            const cost = interpreter.interpret(advancementRule.cost, localContext);
            const isAvailable = interpreter.interpret(advancementRule.when, localContext);
            return {
                option,
                cost,
                isAvailable: isAvailable && cost <= _.get(localContext, advancementRule.uses)
            }
        });

        advancements[availableAdvancementType] = {
            options: concreteOptions
        };
        return advancements;
    }, {});
}

function applyAdvancements(state) {
    (state.character.advancements || []).forEach(advancement => {
        interpreter.interpret(rules.advancement[advancement.type].effect, {
            $state: state,
            $this: advancement.advancement,
            $rules: rules,
            $model: models
        });
    });
};

function runHooks(when, state, action) {
    const hooksToRun = hooks.filter(hook => {
        const matchesTrigger = hook.when ? interpreter.interpret(hook.when, {
            $this: {
                action
            }
        }) : true;
        return hook[when] === action.type && matchesTrigger;
    });
    hooksToRun.forEach(hook => {
        hook.effects.forEach(effect => {
            interpreter.interpret(effect, {$state: state, $this: action});
        })
    });
}

const runBeforeHooks = runHooks.bind(null, "before");
const runAfterHooks = runHooks.bind(null, "after");

export default function (previousState, action) {
    if (previousState) {
        runBeforeHooks(previousState, action);
        previousState = {...previousState};
        if (action.type === "SET") {
            const path = (() => {
                if (action.path.startsWith("$state")) {
                    return action.path.substring("$state.".length);
                }
            })();
            _.set(previousState, path, action.value);
        }
        if (action.type === "REMOVE") {
            const array = _.get(previousState, action.path);
            if (!_.isArray(array)) {
                throw new Error(`value at path ${action.path} is not array!`);
            }
            array.splice(action.remove);
        }
        if (action.type === "ADD") {
            const array = _.get(previousState, action.path);
            if (!_.isArray(array)) {
                throw new Error(`value at path ${action.path} is not array!`);
            }
            array.push(action.value);
        }
        if (action.type === "ADVANCEMENT") {
            const addedAdvancement = {
                type: action.advancementType,
                advancement: action.advancement,
                cost: previousState.selectedAdvancement[action.advancementType].cost
            };
            const advancementRule = rules.advancement[action.advancementType];
            const isAvailable = interpreter.interpret(advancementRule.when, {
                $state: previousState,
                $this: previousState.selectedAdvancement[action.advancementType].option
            }) === true && interpreter.interpret(advancementRule.cost, {
                $state: previousState,
                $this: previousState.selectedAdvancement[action.advancementType].option
            }) <= previousState.character.availableExperience;
            if (isAvailable) {
                previousState.character.advancements.push(addedAdvancement);
            } else {
                alert("Advancement not added, prerequisites not met.")
                console.warn("Attempted to add an advancement when it shouldn't be allowed.")
            }
        }
        if (action.type === "REMOVE-ADVANCEMENT") {
            const tokens = action.value.split(" ");
            const advancementType = tokens[0];
            const foundAdvancement = previousState.character.advancements.find(adv => {
                return adv.value.option === advancementType;
            });
            let previousMatchFound = false;
            previousState.character.advancements = previousState.character.advancements.filter(x => {
                if (previousMatchFound) {
                    return false;
                } else {
                    previousMatchFound = Object.is(x, foundAdvancement);
                    return previousMatchFound;
                }

            })
        }
        if (action.type === "OVERRIDE") {
            previousState.character = {...new models.character(), ...action.state};
        }
    } else {
        previousState = {character: new models.character()};
    }

    setCalculatedProperties(models.character.prototype.definition, null, previousState, ["character"]);
    applyAdvancements(previousState);
    setAvailableAdvancements(previousState);
    runAfterHooks(previousState, action);

    return previousState;
};