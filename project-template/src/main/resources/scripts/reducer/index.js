import * as _ from "lodash";
import models from "./models";
import interpreter from "../interpreter";
import {evaluateObjectProperties} from "../interpreter";
import rules from "!./rules.json";
import hooks from "!./hooks.json";
import {createSelector} from "reselect/lib/index";
import modelTranslator from "./modelTranslator";
import applyEffects from "./applyEffects";
import calculateTransformers from "./transformerCalculator";

export default function (previousState, action) {
    if (previousState) {
        if(!Object.values(ACTION_TYPES).includes(action.type)) {
            throw new Error(`Action type ${action.type} is not supported.`);
        }
        previousState = {
            ...previousState, ...{
                character: new models.character()
            }
        };
        const actionPath = (() => {
            if (action && action.path && action.path.startsWith("$state.")) {
                return action.path.substring("$state.".length);
            } else {
                throw new Error(`Path ${action.path} is invalid, it must begin with $state.`)
            }
        })();
        let transformedValue = modelTranslator(models, actionPath, action.value);
        if (action.type === "SET") {
            if (actionPath.startsWith("character")) {
                calculateTransformers(previousState, "SET", actionPath, transformedValue);
            } else {
                _.set(previousState, actionPath, transformedValue);
            }
        }
        if (action.type === "REMOVE") {
            if (actionPath.startsWith("character")) {
                calculateTransformers(previousState, "REMOVE", actionPath, transformedValue);
            } else {
                const array = _.get(previousState, actionPath);
                if (array) {
                    let itemToRemoveFound = false;
                    _.set(previousState, actionPath, array.filter((v, i) => {
                        itemToRemoveFound = itemToRemoveFound || i === action.index || _.isEqual(v, transformedValue);
                        return itemToRemoveFound;
                    }));
                }
            }
        }
        if (action.type === "PUSH") {
            if (actionPath.startsWith("character")) {
                calculateTransformers(previousState, "PUSH", actionPath, transformedValue);
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
    } else if (comparison.contains) {
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

const runAfterHooks = runHooks.bind(null, "after");

function interpretTransformerEffects(context, transformer) {
    const evaluator = evaluateObjectProperties.bind(null, context);
    transformer.effects = (_.isArray(transformer.effects) ? transformer.effects : [transformer.effects]).map(evaluator)
        .map(transformed => {
            transformed.value = _.isObject(transformed.value) ? interpretTransformerEffects(context, transformed.value) : transformed.value
            return transformed;
        });
    return transformer;
}

function transformerExtractor(action, state, value, target) {
    let addThisTransformer = {
        effects: {
            target,
            action,
            value,
        },
        requires: value.requires
    };
    const evaluationContext = {$state: state, $this: {...value, source: value}};
    addThisTransformer = addThisTransformer.effects ? interpretTransformerEffects(evaluationContext, addThisTransformer) : addThisTransformer;
    return [addThisTransformer];
}

const extractTransformersForArrayPush = transformerExtractor.bind(null, "PUSH");

function calculatedStateProjection(state) {
    applyEffects(state);
    setCalculatedProperties(models.character.prototype.definition, null, state, ["character"]);
    setAvailableAdvancements(state);
    return state;
}

export const calculateStateProjection = createSelector(state => state, calculatedStateProjection);

export const ACTION_TYPES = {
    SET: "SET",
    PUSH: "PUSH",
    REMOVE: "REMOVE",
    OVERRIDE: "OVERRIDE"
}