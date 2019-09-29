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
                $state: state,
                $models: models,
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
        }, _.get(state, joinedStatePath));
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
    if (_.isFunction(requirements)) {
        return requirements(context);
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
        } else {
            return evaluateComparisonObject(requirements, context);
        }
    }
}

function evaluateComparisonObject(comparison, context) {
    const evaluatedValue = interpreter.interpret(comparison.target, context);
    if (comparison.lessThan !== undefined) {
        return evaluatedValue < comparison.lessThan;
    } else if(comparison.contains){
        return _.isArray(evaluatedValue) && evaluatedValue.map(ev => ev.id).includes(comparison.contains);
    } else {
        const keys = Object.keys(comparison);
        return keys.reduce((allMatch, nextProperty) => {
            return allMatch && _.isEqual(_.get(context, nextProperty), comparison[nextProperty]);
        }, true);
    }
}

function setAvailableAdvancements(state) {
    const sharedContext = {
        $state: state
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
            const isAvailable = evaluateRequirements(advancementRule.requires, localContext);
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

function runHooks(when, state, action) {
    const hooksToRun = hooks.filter(hook => {
        const matchesTrigger = hook.when ? interpreter.interpret(hook.when, {
            $state: state,
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
    if (value === undefined) {
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
            const lookupValue = _.get(models, `${modelType.type.values}`, []).find(v => v.id === value);
            if (lookupValue) {
                lookupValue.effects = [...models[modelType.type].prototype.effects];
            }
            return lookupValue ? lookupValue : {...new models[modelType.type](), ...value};
        } else {
            return value;
        }
    }
}

function recursivelyExtractTransformers(state, value, target, parent) {
    const addThisTransformer = {
        effects: {
            target,
            action: 'SET',
            value,
        },
        requires: value.requires,
        source: value
    };
    const childTransformers = (value.effects || []).map(v => {
        return {
            effects: {...v, source: value}, requires: context => {
                const targetValue = _.get(context.$state, target);
                if (_.isArray(targetValue)) {
                    return targetValue.includes(value);
                } else {
                    _.isEqual(targetValue, value);
                }
            }
        }
    });
    return [addThisTransformer].concat(childTransformers);
}

function recursivelyExtractTransformersForArrayPush(state, value, target, parent) {
    const addThisTransformer = {
        effects: {
            target,
            action: 'PUSH',
            value,
        },
        requires: value.requires
    };
    const childTransformers = (value.effects || []).map(v => {
        return {
            effects: {...v, source: value}, requires: context => {
                const targetValue = _.get(context.$state, target);
                if (_.isArray(targetValue)) {
                    return targetValue.includes(value);
                } else {
                    _.isEqual(targetValue, value);
                }
            }
        }
    });
    return [addThisTransformer].concat(childTransformers);
}

export default function (previousState, action) {
    if (previousState) {
        previousState = {
            ...previousState, ...{
                character: new models.character()
            }
        };
        const actionPath = (() => {
            if (action && action.path && action.path.startsWith("$state")) {
                return action.path.substring("$state.".length);
            }
        })();
        let transformedValue = transformToModelInstance(actionPath, interpreter.interpret(action.value, {
            $state: previousState
        }));
        runBeforeHooks(previousState, action);
        if (action.type === "SET") {
            if(actionPath.startsWith("character")) {
                previousState.transformers = previousState.transformers.filter(t => {
                    const sameAction = _.isEqualWith(t.effects.action, 'set', (x, y) => x.toLowerCase() === y.toLowerCase());
                    const sameTarget = t.effects.target === actionPath;
                    return !sameAction || !sameTarget;
                }).concat(recursivelyExtractTransformers(previousState, transformedValue, actionPath));
            } else {
                _.set(previousState, actionPath, transformedValue);
            }
        }
        if (action.type === "REMOVE") {
            if(actionPath.startsWith("character")) {
                if (!_.isArray(_.get(previousState, actionPath))) {
                    throw new Error(`value at path ${actionPath} is not array!`);
                }
                let itemToRemoveFound = false;
                previousState.transformers = previousState.transformers.filter(t => {
                    if (!itemToRemoveFound) {
                        itemToRemoveFound = t.effects.target === actionPath && t.effects.action === 'PUSH' &&
                            _.isEqual(action.remove, t.effects.value);
                        return !itemToRemoveFound;
                    }
                    return true;
                });
            } else {
                const array = _.get(previousState, actionPath);
                if (array) {
                    let itemToRemoveFound = false;
                    _.set(previousState, actionPath, array.filter((v, i) =>{
                        itemToRemoveFound = itemToRemoveFound || i === action.index || _.isEqual(v, transformedValue);
                        return itemToRemoveFound;
                    }));
                }
            }
        }
        if (action.type === "PUSH") {
            if(actionPath.startsWith("character")) {
                if (_.isArray(transformedValue.effects)) {
                    transformedValue.effects = (transformedValue.effects || []).map(transformEffect => {
                        return {
                            ...transformEffect, ...{
                                requires: state => _.get(state, actionPath) === transformedValue
                            }
                        };
                    });
                } else if (_.isObject(transformedValue.effects)) {
                    transformedValue.effects.requires = state => _.get(state, actionPath) === transformedValue;
                }
                previousState.transformers = [...previousState.transformers.filter(t => {
                    const sameAction = _.isEqualWith(t.effects.action, 'set', (x, y) => x.toLowerCase() === y.toLowerCase());
                    const sameTarget = t.effects.target === actionPath;
                    return !sameAction || !sameTarget;
                })].concat(recursivelyExtractTransformersForArrayPush(previousState, transformedValue, actionPath));
            } else {
                _.get(previousState, actionPath).push(transformedValue);
            }
        }
        if (action.type === "OVERRIDE") {
            previousState.character = {...new models.character(), ...action.state};
        }
        runAfterHooks(previousState, action);
    } else {
        previousState = {
            character: new models.character(),
            transformers: []
        };
    }

    return previousState;
};

function calculatedStateProjection(state) {
    recalculateEffects(state);
    setCalculatedProperties(models.character.prototype.definition, null, state, ["character"]);
    setAvailableAdvancements(state);
    return state;
}

export const calculateStateProjection = createSelector(state => state, calculatedStateProjection);

function populateAdvancement(advancementRule, advancementAction, context) {
    const advancement = {...advancementAction};
    advancement.id = advancementAction.advancement.id;
    context = {
        ...context, ...{
            $this: advancement.value
        }
    };
    advancement.transformers = advancementRule.transformers.map(effect => {
        effect.target = interpreter.interpret(effect.target, context);
        effect.add = interpreter.interpret(effect.add, context);
        effect.push = interpreter.interpret(effect.push, context);
        return effect;
    });
    return advancement;
}

function recalculateEffects(state) {
    state.transformers = state.transformers.filter(transformer => {
        const requirementsMet = evaluateRequirements(transformer.requires, {
            $state: state,
            $this: transformer
        }) !== false;
        if (requirementsMet) {
            if (_.isArray(transformer.effects)) {
                transformer.effects.forEach(applyEffect.bind(null, state));
            } else {
                applyEffect(state, transformer.effects);
            }

            return true;
        }
        return false;
    });
    return state;
}

function applyEffect(state, effect) {
    var context = {$state: state, $this: effect.source};
    const target = (function () {
        const interpretedValue = interpreter.interpret(effect.target, context);
        if (_.isString(interpretedValue)) {
            return interpretedValue.replace("$state.", "");
        } else {
            return interpretedValue;
        }
    })();
    const willBeApplied = (effect.if === undefined || interpreter.interpret(effect.if, context)) && target.startsWith("character");
    if (willBeApplied) {
        const action = effect.action;
        const value = interpreter.interpret(effect.value, {...context, $this: effect.source});
        const initialValue = _.get(state, target);
        switch (action) {
            case 'ADD':
                _.set(state, target, initialValue + value);
                break;
            case 'SUBTRACT':
                _.set(state, target, initialValue - value);
                break;
            case 'PUSH':
                const initialArray = _.get(state, target);
                effect.index = initialArray.length;
                const array = [...initialArray];
                array.push(value);
                _.set(state, target, array);
                break;
            case 'SET':
                _.set(state, target, value);
                break;
        }
    }
}