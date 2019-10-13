import interpreter from "../interpreter";
import _ from "lodash";
import evaluateRequirements from "./evaluateRequirements";
import modelTranslator from "./modelTranslator";
import models from "../models";
import copyWithPrototype from "../copyWithPrototype";

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
    const target = interpreter.interpret(effect.path, context).replace("$state.", "");
    const willBeApplied = evaluateRequirements(effect.requires, context);
    if (willBeApplied) {
        const action = effect.action;
        const value = modelTranslator(models, target, interpreter.interpret(effect.value, context));
        const initialValue = _.get(state, target);
        switch (action) {
            case 'ADD':
                _.set(state, target, (_.isNumber(initialValue) ? initialValue : 0) + value);
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
        }
        if (value.effects) {
            recursivelyApplyEffects(state, value.effects, hooks, value);
        }
    }
}

export default recalculateEffects;