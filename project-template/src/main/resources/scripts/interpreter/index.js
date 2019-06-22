import rules from "!../rules.json";
export default {
    interpret: function(expression, context){
        return new Function("$state", "$model", "$this", "$rules", expression)(context.$state, context.$model, context.$this, rules );
    }
};