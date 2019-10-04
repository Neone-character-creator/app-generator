import * as _ from "lodash";
import models from "../models";
import interpreter from "../interpreter";
import hooksConfiguration from "!../hooks.json";
import Hook from "./hooks";
import {createSelector} from "reselect/lib/index";
import modelTranslator from "./modelTranslator";
import applyEffects from "./applyEffects";
import calculateTransformers from "./transformerCalculator";

const hooks = new Hook(hooksConfiguration);

export default function (previousState, action) {
    if (previousState) {
        if(!Object.values(ACTION_TYPES).includes(action.type)) {
            throw new Error("Action type " + action.type +" is not supported.");
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
                throw new Error("Path " + action.path + " is invalid, it must begin with $state.");
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
        applyEffects(previousState, hooks);
        setCalculatedProperties(models.character.prototype.definition, null, previousState, ["character"]);
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
        throw new Error("A difference between " + newValue +" and " + previousBase + "doesn't make sense.");
    }
}

function setCalculatedProperties(modelDefinition, ancestorDefinitions, state, statePath) {
    const joinedStatePath = statePath[0] + statePath.slice(1).map(element => "[" + element +"]").join("");
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
                        }).map(x => "[" + x + "]").join("");
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
        const propertyPath = [...statePath, nextPropertyName];
        if (modelProperty.derivedFrom || modelProperty.baseValue) {
            setCalculatedProperties(modelProperty, parentScopes, state, propertyPath);
        } else if (propertyModelDefinition) {
            setCalculatedProperties(propertyModelDefinition, parentScopes, state, propertyPath);
        }
    }, state);
}

function calculatedStateProjection(state) {
    return state;
}

export const calculateStateProjection = createSelector(state => state, calculatedStateProjection);

export const ACTION_TYPES = {
    SET: "SET",
    PUSH: "PUSH",
    REMOVE: "REMOVE",
    OVERRIDE: "OVERRIDE"
}