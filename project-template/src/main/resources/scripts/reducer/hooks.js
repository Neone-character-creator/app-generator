import interpreter from "../interpreter";

class Hooks {
    constructor(configuration) {
        this.configuration = configuration;
    }
}

function runHooks(configuration, when, state, path, action) {
    const hooksToRun = configuration.filter(hook => {
        const matchesTrigger = hook.when ? interpreter.interpret(hook.when, {
            $state: state,
            $this: {
                path,
                action
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

Hooks.prototype.before = function(state, path, action){
    runHooks(this.configuration, "before", state, path, action);
};
Hooks.prototype.after = function(state, path, action){
    runHooks(this.configuration, "after", state, path, action);
};
export default Hooks;