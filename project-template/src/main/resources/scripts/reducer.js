import * as _ from "lodash";
import models from "./models";
import interpreter from "./interpreter";
import rules from "!./rules.json";
import hooks from "!./hooks.json";
import {createSelector} from "reselect";

const baseValues = {};

function calculateDiff(newValue, previousBase) {
    if (_.isArray(previousBase)) {
        return _.difference(newValue || [], previousBase)
    } else if (_.isNumber(previousBase)) {
        return newValue - previousBase;
    } else {
        throw new Error(`A difference between ${newValue} and ${previousBase} doesn't make sense.`);
    }
}

function setCalculatedProperties(modelDefinition, ancestorDefinitions, state, statePath) {
    const joinedStatePath = statePath[0] + statePath.slice(1).map(element => `[${element}]`).join("");
    if (modelDefinition.baseValue) {
        const originalBaseValue = _.get(baseValues, joinedStatePath) || (modelDefinition.type === "number" ? 0 : []);
        const differenceFromOriginalBase = calculateDiff(_.get(state, joinedStatePath), originalBaseValue) || 0;
        const baseValue = modelDefinition.baseValue.reduce((accumulator, nextExpression) => {
            return interpreter.interpret(nextExpression, {$state: state, $models: models, $this: accumulator}, true)
                || accumulator;
        }, 0);
        if (originalBaseValue !== baseValue) {
            _.set(baseValues, joinedStatePath, baseValue);
        }
        if (_.isArray(baseValue)) {
            _.set(state, joinedStatePath, baseValue.concat(differenceFromOriginalBase));
        } else {
            _.set(state, joinedStatePath, baseValue + differenceFromOriginalBase);
        }
    } else if (modelDefinition.derivedFrom) {
        let value = modelDefinition.derivedFrom.reduce((accumulator, nextExpression) => {
            const localContext = {
                $state: state, $models: models,
                $this: {
                    definition: modelDefinition,
                    path: statePath,
                    accumulator,
                    ancestors: statePath.filter((x, i) => i < statePath.length - 1).map((element, index) => {
                        const joined = statePath.filter((x, i) => {
                            return i <= index;
                        }).map(x => `[${x}]`).join("");
                        return _.get(state, joined);
                    }).reverse()
                }
            };
            return interpreter.interpret(nextExpression, localContext);
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

function evaluateArrayOfExpressions(expressions, context) {
    return expressions.reduce((accumulator, nextExpression) => {
        const localContext = {...context};
        _.set(localContext, '$this.accumulator', accumulator);
        return interpreter.interpret(nextExpression, localContext);
    }, [])
}

function evaluateRequirements(requirements, context) {
    if (requirements === undefined) {
        return true;
    }
    var localContext = {...context};
    if (_.isString(requirements)) {
        return interpreter.interpret(requirements, localContext);
    } else if (_.isArray(requirements)) {
        return evaluateArrayOfExpressions(requirements, localContext);
    } else if (_.isObject(requirements)) {
        if (requirements.any) {
            return requirements.any.reduce((anyMeet, expression) => {
                return anyMeet || evaluateRequirements(expression, localContext);
            }, false);
        } else if (requirements.all) {
            return requirements.all.reduce((anyMeet, expression) => {
                return anyMeet && evaluateRequirements(expression, localContext);
            }, requirements.all.length > 0);
        }
    }
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
        } else if (_.isArray(advancementRule.options)) {
            concreteOptions = evaluateArrayOfExpressions(advancementRule.options, sharedContext);
        } else if (advancementRule.options.values) {
            concreteOptions = advancementRule.options.values;
        }
        concreteOptions = concreteOptions.map(option => {
            if (_.isArray(option)) {
                option = [...option];
            } else if (_.isObject(option)) {
                option = {...option};
            }
            const localContext = {...sharedContext, $this: option};
            const cost = interpreter.interpret(advancementRule.cost, localContext) || 0;
            if (advancementRule.optionTransformer) {
                if (_.isArray(advancementRule.optionTransformer)) {
                    evaluateArrayOfExpressions(advancementRule.optionTransformer, localContext);
                } else {
                    interpreter.interpret(advancementRule.optionTransformer, localContext)
                }
            }
            const isAvailable = evaluateRequirements(advancementRule.when, localContext);
            return {
                option,
                cost,
                meetsRequirements: isAvailable,
                meetsCost: cost <= _.get(localContext, advancementRule.uses),
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
    _.flatMap(_.get(state, 'character.advancements', []).map(a => a.effects)).forEach(applyEffect.bind(null, state));
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

const arrayTypeMatcher = /\[(.*)\]/;

function transformToModelInstance(path, value) {
    if(value === undefined) {
        return;
    }
    if (value.id) {
        return value;
    } else {
        const pathElements = path.split(".");
        const modelDef = pathElements.reduce((loc, nextPathElement) => {
            if (loc === undefined) {
                return undefined;
            }
            if (loc.prototype) {
                return loc.prototype.definition[nextPathElement]
            } else {
                return loc[nextPathElement];
            }
        }, models);
        if (modelDef) {
            const modelType = modelDef.type.match(arrayTypeMatcher) ? {
                    type: arrayTypeMatcher.exec(modelDef.type)[1],
                    isArray: true
                } :
                {
                    type: modelDef.type
                };
            if (modelType.type === "string" || modelType.type === "number" || _.isArray(value)) {
                return value;
            }
            const lookupValue = models[modelType.type].values.find(v => v.id === value);
            return lookupValue ? lookupValue : {...new models[modelType.type](), ...value};
        } else {
            return value;
        }
    }
}

export default function (previousState, action) {
    if (previousState) {
        previousState = {...previousState};
        const actionPath = (() => {
            if (action && action.path && action.path.startsWith("$state")) {
                return action.path.substring("$state.".length);
            }
        })();
        const transformedValue = transformToModelInstance(actionPath, action.value);
        runBeforeHooks(previousState, action);
        if (action.type === "SET") {
            if (transformedValue.effects) {
                previousState.effects.push(transformedValue);
            }
            _.set(previousState, actionPath, transformedValue);
        }
        if (action.type === "REMOVE") {
            const array = _.get(previousState, actionPath);
            if (!_.isArray(array)) {
                throw new Error(`value at path ${actionPath} is not array!`);
            }
            const updatedArray = [...array];
            const removed = updatedArray.splice(action.remove, 1);
            _.pull(previousState.effects, removed);
            _.set(previousState, actionPath, [...updatedArray]);
        }
        if (action.type === "ADD") {
            const array = _.get(previousState, actionPath);
            if (!_.isArray(array)) {
                throw new Error(`value at path ${actionPath} is not array!`);
            }
            const updatedArray = [...array];
            updatedArray.push(transformedValue);
            if (transformedValue.effects) {
                previousState.effects.push(transformedValue);
            }
            _.set(previousState, actionPath, [...updatedArray]);
        }
        if (action.type === "ADVANCEMENT") {
            const addedAdvancement = {
                type: action.advancementType,
                advancement: action.advancement,
                cost: previousState.selectedAdvancement[action.advancementType].cost
            };
            const advancementRule = rules.advancement[action.advancementType];
            const isAvailable = evaluateRequirements(advancementRule.when, {
                $state: previousState,
                $this: previousState.selectedAdvancement[action.advancementType].option
            });
            if (isAvailable) {
                const updatedArray = [...previousState.character.advancements, populateAdvancement(advancementRule, addedAdvancement, {$state: previousState})];
                previousState.character.advancements = updatedArray;
            } else {
                alert("Advancement not added, prerequisites not met.");
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
        runAfterHooks(previousState, action);
    } else {
        previousState = {
            character: new models.character(),
            effects: []
        };
    }

    return previousState;
};

function calculatedStateProjection(state) {
    setCalculatedProperties(models.character.prototype.definition, null, state, ["character"]);
    applyEffects(state);
    applyAdvancements(state);
    setAvailableAdvancements(state);
    return state;
}

export const calculateStateProjection = createSelector(state => state, calculatedStateProjection);

function populateAdvancement(advancementRule, advancementAction, context) {
    const advancement = {...advancementAction};
    advancement.id = advancementAction.id;
    context = {...context, ...{
        $this: advancement.value
    }};
    advancement.effects = advancementRule.effects.map(effect => {
        effect.target = interpreter.interpret(effect.target, context);
        effect.add = interpreter.interpret(effect.add, context);
        effect.push = interpreter.interpret(effect.push, context);
        return effect;
    });
    return advancement;
}

function applyEffects(state){
    _.flatMap(state.effects, se => se.effects).forEach(applyEffect.bind(null, state));
}

function applyEffect(state, effect){
    var context = {$state: state};
    const willBeApplied = effect.if === undefined || interpreter.interpret(effect.if, context);
    if(willBeApplied) {
        const target = effect.target;
        if (effect.add) {
            const initialValue = _.get({$state: state}, target);
            const toAdd = effect.add;
            _.set({$state: state}, target, initialValue + toAdd);
        } else if (effect.push) {
            const array = [..._.get({$state: state}, target)];
            const toPush = effect.push;
            array.push(toPush);
            _.set({$state: state}, target, array);
        }
    }
}