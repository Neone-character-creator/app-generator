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
    if (_.isArray(value)) {
        value.forEach(reattachPrototypes);
    } else if (_.isObject(value)) {
        if (value._protoName) {
            Object.setPrototypeOf(value, models[value._protoName].prototype);
        }
        Object.keys(value).forEach(property => {
            if (_.isObject(value[property])) {
                reattachPrototypes(value[property]);
            }
        })
    }
};

function extractActionPathFromAction(action) {
    if(_.isArray(action.path)) {
        if (action.type !== "SWAP") {
            throw new Error("A path with an array type is only allowed for SWAP actions.");
        }
        if(action.path.length !== 2) {
            throw new Error("If action type is SWAP, path must be an array containing 2 strings.");
        }
        if (!action.path.every(p => _.isString(p))) {
            throw new Error("If path is an array for a SWAP, each element bust me a string.");
        }
        return action.path.map(p => extractActionPathFromAction({
            path: p
        }));
    } else if (action && action.path && action.path.startsWith("$state")) {
        return action.path.slice("$state.".length);
    } else if (action && action.path && action.path.startsWith("$temp")) {
        return action.path.substring("$temp.".length);
    }
}

function actionPathIsTemp(path) {
    return _.isArray(path) ? path.every(p => p.startsWith("$temp")) : path.startsWith("$temp");
}

const actionHandlers = new Proxy({
    "persist/REHYDRATE": function (state, action) {
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
        const actionPath = extractActionPathFromAction(action);
        let isTemp = actionPathIsTemp(action.path);
        state = {...generateNewState(), transformers: state.transformers, $temp: state.$temp};

        let translatedValue = action.type === "REMOVE" ? action.value : modelTranslator(models, actionPath, interpreter.interpret(action.value, {
            $state: state,
        }));

        let transformedValue = !_.isArray(translatedValue) && _.isObject(translatedValue) ?
            copyWithPrototype(translatedValue) : translatedValue;
        hooks.before(state, actionPath, action, transformedValue);
        if (isTemp) {
            return setTempProperty(state, action.type, actionPath, transformedValue);
        } else {
            state.transformers = calculateTransformers(state, action.type, actionPath, transformedValue);
            return state;
        }
    },
    OVERRIDE: function (state, action) {
        state = _.merge(generateNewState(), {
                character: action.state
            });
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
        if (actionPath) {
            hooks.after(state, action.path, action.type, action.type === "REMOVE" ? action.value : modelTranslator(models, actionPath, interpreter.interpret(action.value, {
                $state: state,
            })));
        }
        calculateProperties(models.character.prototype, null, previousState, ["character"]);
        return state;
    } else {
        previousState = generateNewState();
        calculateProperties(models.character.prototype, null, previousState, ["character"]);
    }

    return previousState;
};

function calculateProperties(modelPrototype, ancestorDefinitions, state, statePath) {
    var evaluationCount = 0;
    var hasChangesSinceLastEvaluation = false;
    do {
        if(evaluationCount > 2) {
            throw new Error("Calculated property evaluation took more than 2 iterations. This likely is caused by a circular reference, where properties are causing each other to change in an infinite loop");
        }
        evaluationCount++;
        hasChangesSinceLastEvaluation = setCalculatedProperties(modelPrototype, ancestorDefinitions, state, statePath);
    } while(hasChangesSinceLastEvaluation);
}

const previousBaseValues = {};

function calculateDiff(newValue, oldValue) {
    if (_.isNumber(newValue) && _.isNumber(oldValue)) {
        return oldValue - newValue;
    } else if (_.isArray(newValue) && _.isArray(oldValue)) {
        return _.difference(newValue, oldValue);
    } else {
        throw new Error("Tried to find diff between a " + typeof newValue + " and a " + typeof oldValue + " which isn't supported");
    }
}

const previousCalculatedValues = {};

function setCalculatedProperties(modelPrototype, ancestorDefinitions, state, statePath) {
    const modelDefinition = modelPrototype.definition;
    const joinedStatePath = statePath[0] + statePath.slice(1).map(element => "[" + element + "]").join("");
    var evaluatedNewValue = false;
    if (modelDefinition.baseValue) {
        const currentValue = _.get(state, joinedStatePath);
        const previousBaseValue = _.get(previousBaseValues, joinedStatePath) || (modelDefinition.type === "number" ? 0 : []);
        const userChanges = calculateDiff(currentValue, previousBaseValue);
        const newBaseValue = modelDefinition.baseValue.reduce((accumulator, nextExpression) => {
            return interpreter.interpret(nextExpression, {$state: state, $models: models, $this: accumulator}, true)
                || accumulator;
        }, modelDefinition.type === "number" ? 0 : []);
        const newValue = _.isArray(currentValue) ? newBaseValue.concat(userChanges) : newBaseValue + userChanges;
        const lastCalculatedValue = previousCalculatedValues[joinedStatePath];
        if(!_.isEqual(lastCalculatedValue, newValue)) {
            _.set(state, joinedStatePath, newValue);
            previousCalculatedValues[joinedStatePath] = newValue;
            evaluatedNewValue = true;
        }
    } else if (modelDefinition.derivedFrom) {
        let newValue = modelDefinition.derivedFrom.reduce((accumulator, nextExpression) => {
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
        const lastCalculatedValue = previousCalculatedValues[joinedStatePath];
        if(!_.isEqual(lastCalculatedValue, newValue)) {
            _.set(state, joinedStatePath, newValue);
            previousCalculatedValues[joinedStatePath] = newValue;
            evaluatedNewValue = true;
        }
    }
    // FIXME: Different "definitions" are actually different objects.
    Object.getOwnPropertyNames(modelDefinition).reduce((updated, nextPropertyName) => {
        const parentScopes = ancestorDefinitions ? [...ancestorDefinitions, modelDefinition] : [modelDefinition];
        const modelProperty = modelDefinition[nextPropertyName];
        const propertyModelDefinition = models[modelDefinition[nextPropertyName].type] ? models[modelDefinition[nextPropertyName].type].prototype : {definition : modelProperty};
        const propertyPath = [...statePath, nextPropertyName];
        if (modelProperty.derivedFrom || modelProperty.baseValue) {
            evaluatedNewValue = setCalculatedProperties(propertyModelDefinition, parentScopes, state, propertyPath) || evaluatedNewValue;
        }
    }, state);
    return evaluatedNewValue;
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
    PERSIST: "persist/PERSIST",
    SWAP: "SWAP"
};