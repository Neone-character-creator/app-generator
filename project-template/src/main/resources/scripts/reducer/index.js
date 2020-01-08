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
import PropertyCalculator from "./propertyCalculator";

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
    if (_.isArray(action.path)) {
        if (action.type !== "SWAP") {
            throw new Error("A path with an array type is only allowed for SWAP actions.");
        }
        if (action.path.length !== 2) {
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

const propertyCalculator = new PropertyCalculator();

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
        propertyCalculator.calculate(models.character.prototype, null, state, ["character"]);
        return state;
    } else {
        previousState = generateNewState();
        propertyCalculator.calculate(models.character.prototype, null, previousState, ["character"]);
    }

    return previousState;
};

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