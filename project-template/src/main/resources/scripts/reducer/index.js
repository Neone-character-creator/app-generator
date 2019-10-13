import * as _ from "lodash";
import models from "../models";
import interpreter from "../interpreter";
import hooksConfiguration from "!../hooks.json";
import Hook from "./hooks";
import {createSelector} from "reselect/lib/index";
import modelTranslator from "./modelTranslator";
import applyEffects from "./applyEffects";
import calculateTransformers from "./transformerCalculator";
import setTempProperty from "./setTempProperty";
import copyWithPrototype from "../copyWithPrototype";

const hooks = new Hook(hooksConfiguration);

function generateNewState() {
    return {
        character: new models.character(),
        transformers: []
    };
}

function reattachPrototypes(value) {
    if(_.isArray(value)) {
        value.forEach(reattachPrototypes);
    } else if (_.isObject(value)) {
        if (value._protoName) {
            Object.setPrototypeOf(value, models[value._protoName].prototype);
        }
        Object.keys(value).forEach(property =>{
            if (_.isObject(value[property])) {
                reattachPrototypes(value[property]);
            }
        })
    }
};

function extractActionPathFromAction(action){
    if (action && action.path && action.path.startsWith("$state")) {
        return action.path.slice("$state.".length);
    } else if (action && action.path && action.path.startsWith("$temp")) {
        return action.path.substring("$temp.".length);
    }
}

function actionPathIsTemp(action){
    return action.path.startsWith("$temp");
}

const actionHandlers = new Proxy({
    "persist/REHYDRATE": function (state, action) {
        //
        reattachPrototypes(_.get(action, "payload.transformers", []));
        return {
            ...generateNewState(),
            transformers: _.get(action.payload, "transformers", [])
        };
    },
    "persist/PERSIST": function (state, action) {
        return state;
    },
    default: function (state, action) {
        let isTemp = actionPathIsTemp(action);
        const actionPath = extractActionPathFromAction(action);
        state = {...generateNewState(), transformers: state.transformers, $temp: state.$temp};

        let transformedValue = action.type === "REMOVE" ? action.value : copyWithPrototype(modelTranslator(models, actionPath, interpreter.interpret(action.value, {
            $state: state,
        })));
        hooks.before(state, actionPath, action, transformedValue);
        if (isTemp) {
            return setTempProperty(state, action.type, actionPath, transformedValue);
        } else {
            state.transformers = calculateTransformers(state, action.type, actionPath, transformedValue);
            return state;
        }
    },
    OVERRIDE: function (state, action) {
        state = {...generateNewState(), ...action.state};
        return state;
    }
}, {
    get: function (target, prop, receiver) {
        if (!target.hasOwnProperty(prop)) {
            return target["default"];
        } else {
            return target[prop];
        }
    }
});

export default function (previousState, action) {
    if (previousState) {
        if (!Object.values(ACTION_TYPES).includes(action.type)) {
            throw new Error("Action type " + action.type + " is not supported.");
        }

        const actionPath = extractActionPathFromAction(action);

        const state = actionHandlers[action.type](previousState, action)
        applyEffects(state, hooks);
        if(actionPath) {
            hooks.after(state, action.path, action.type, modelTranslator(models, actionPath, interpreter.interpret(action.value, {
                $state: state,
            })));
        }
        setCalculatedProperties(models.character.prototype.definition, null, state, ["character"]);
        return state;
    } else {
        previousState = generateNewState();
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
        throw new Error("A difference between " + newValue + " and " + previousBase + "doesn't make sense.");
    }
}

function setCalculatedProperties(modelDefinition, ancestorDefinitions, state, statePath) {
    const joinedStatePath = statePath[0] + statePath.slice(1).map(element => "[" + element + "]").join("");
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
    OVERRIDE: "OVERRIDE",
    REHYDRATE: "persist/REHYDRATE",
    PERSIST: "persist/PERSIST"
};