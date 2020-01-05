import interpreter from "../interpreter";
import _ from "lodash";
import evaluateRequirements from "./evaluateRequirements";
import modelTranslator from "./modelTranslator";
import models from "../models";

function recursivelyApplyEffects(state, effects, hooks, source) {
    if (_.isArray(effects)) {
        effects.forEach(effect => applyEffect(state, effect, source, hooks));
    } else {
        applyEffect(state, effects, source, hooks);
    }
}

function recalculateEffects(state, hooks) {
    state.transformers = state.transformers.filter(transformer => {
        const requirementsMet = evaluateRequirements(transformer.requires, {
            $state: state,
            $this: transformer
        }) !== false;
        if (requirementsMet) {
            recursivelyApplyEffects(state, transformer, hooks);
            return true;
        }
        return false;
    });
    return state;
}

function applyEffect(state, effect, source, hooks) {
    const context = {$state: state, $this: {...effect, source}};
    const interpretedPath = interpreter.interpret(effect.path, context);
    const target = _.isString(interpretedPath) ? interpretedPath.replace("$state.", "") : interpretedPath.map(ip => ip.replace("$state.", ""));
    const willBeApplied = evaluateRequirements(effect.requires, context);
    const initialValue = _.get(state, interpretedPath);
    if (willBeApplied) {
        const action = effect.action;
        const value = modelTranslator(models, target, interpreter.interpret(effect.value, context));
        switch (action) {
            case 'ADD':
                _.set(state, target, (_.isNumber(initialValue) ? initialValue : 0) + (_.isNumber(value) ? value : 0));
                break;
            case 'SUBTRACT':
                _.set(state, target, initialValue - value);
                break;
            case 'PUSH':
                const initialArrayForPush = _.get(state, target);
                const indexOfValue = initialArrayForPush.indexOf(value);
                if (indexOfValue === -1) {
                    effect.index = initialArrayForPush.length;
                    const arrayAfterPush = [...initialArrayForPush];
                    arrayAfterPush.push(value);
                    _.set(state, target, arrayAfterPush);
                } else {
                    effect.index = indexOfValue;
                }
                break;
            case 'SET':
                _.set(state, target, value);
                break;
            case "COMBINE":
                const initialArrayForCombine = _.get(state, target, []);
                const arrayAfterCombine = [...initialArrayForCombine].concat(value);
                _.set(state, target, arrayAfterCombine);
                break;
            case "SWAP":
                const firstValue = _.get(state, target[0]);
                _.set(state, target[0], _.get(state, target[1]));
                _.set(state, target[1], firstValue);
                break;
        }
        if (value && value.effects) {
            recursivelyApplyEffects(state, value.effects, hooks, value);
        }
    }
}

export default recalculateEffects;