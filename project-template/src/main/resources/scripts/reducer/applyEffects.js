import interpreter from "../interpreter";
import _ from "lodash";
import evaluateRequirements from "./evaluateRequirements";

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
    const target = interpreter.interpret(effect.path, context);
    const willBeApplied = evaluateRequirements(effect.requires, context);
    if (willBeApplied) {
        const action = effect.action;
        const value = interpreter.interpret(effect.value, context);
        hooks.before(state, target, action);
        const initialValue = _.get(state, target);
        switch (action) {
            case 'ADD':
                _.set(state, target, (_.isNumber(initialValue) ? initialValue : 0) + value);
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
        hooks.after(state, target, action);
        if (value.effects) {
            recursivelyApplyEffects(state, value.effects, hooks, value);
        }
    }
}

export default recalculateEffects;