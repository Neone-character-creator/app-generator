import * as _ from "lodash";
import models from "./models";
import interpreter from "./interpreter";
import rules from "!./rules.json";
import hooks from "!./hooks.json";

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
        return interpreter.interpret(nextExpression, {
            ...context, ...{
                $this: {
                    accumulator
                }
            }
        })
    }, [])
}

function evaluateRequirements(requirements, context) {
    var localContext = {...context};
    if (_.isString(requirements)) {
        return interpreter.interpret(requirements, localContext);
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
    } else if (_.isArray(requirements)) {
        return evaluateArrayOfExpressions(requirements, localContext);
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
            const localContext = {...sharedContext, $this: option};
            const cost = interpreter.interpret(advancementRule.cost, localContext);
            const isAvailable = evaluateRequirements(advancementRule.when, localContext);
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

const arrayTypeMatcher = /\[(.*)\]/;

function transformToModelInstance(path, value) {
    if (value.id) {
        return value;
    } else {
        const pathElements = path.split(".");
        const modelDef = pathElements.reduce((loc, nextPathElement)=>{
            if(loc === undefined) {
                return undefined;
            }
            if(loc.prototype) {
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
            return {...new models[modelType.type](), ...value};
        } else {
            return value;
        }
    }
}

export default function (previousState, action) {
    if (previousState) {
        runBeforeHooks(previousState, action);
        previousState = {...previousState};
        const actionPath = (() => {
            if (action.path.startsWith("$state")) {
                return action.path.substring("$state.".length);
            }
        })();
        if (action.type === "SET") {
            _.set(previousState, actionPath, transformToModelInstance(actionPath, action.value));
        }
        if (action.type === "REMOVE") {
            const array = _.get(previousState, actionPath);
            if (!_.isArray(array)) {
                throw new Error(`value at path ${actionPath} is not array!`);
            }
            array.splice(action.remove, 1);
            _.set(previousState, actionPath, [...array]);
        }
        if (action.type === "ADD") {
            const array = _.get(previousState, actionPath);
            if (!_.isArray(array)) {
                throw new Error(`value at path ${actionPath} is not array!`);
            }
            array.push(transformToModelInstance(actionPath, action.value));
            _.set(previousState, actionPath, [...array]);
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
}
;