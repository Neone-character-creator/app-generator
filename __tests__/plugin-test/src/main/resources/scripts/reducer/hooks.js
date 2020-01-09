import interpreter from "../interpreter";

class Hooks {
    constructor(configuration) {
        this.configuration = configuration;
    }
}

function runHooks(configuration, when, state, path, action, value) {
    const hooksToRun = configuration.filter(hook => {
        const matchesTrigger = hook.when ? interpreter.interpret(hook.when, {
            $state: state,
            $this: {
                path,
                action,
                value
            }
        }) : true;
        return hook[when] === action && matchesTrigger;
    });
    hooksToRun.forEach(hook => {
        hook.effects.forEach(effect => {
            interpreter.interpret(effect, {$state: state, $this: action});
        })
    });
}

Hooks.prototype.before = function(state, path, action, value){
    runHooks(this.configuration, "before", state, path, action, value);
};
Hooks.prototype.after = function(state, path, action, value){
    runHooks(this.configuration, "after", state, path, action, value);
};
export default Hooks;