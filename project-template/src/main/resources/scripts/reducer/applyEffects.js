import interpreter from "../interpreter";
import * as _ from "./index";

function recursivelyApplyEffects(state, effects) {
    effects.forEach(effect => applyEffect(state, effect));
}

function recalculateEffects(state) {
    state.transformers = state.transformers.filter(transformer => {
        const requirementsMet = evaluateRequirements(transformer.requires, {
            $state: state,
            $this: transformer
        }) !== false;
        if (requirementsMet) {
            recursivelyApplyEffects(state, transformer.effects);
            return true;
        }
        return false;
    });
    return state;
}

function applyEffect(state, effect) {

    var context = {$state: state, $this: effect};
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

export default recalculateEffects;