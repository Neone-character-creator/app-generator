import rules from "!../rules.json";
export default {
    interpret: function(expression, context){
        if (typeof expression === "string" && expression.startsWith("#")) {
            return new Function("$state", "$model", "$this", "$rules", "$index", `return ${expression.substring(1)}`)(context.$state, context.$model, context.$this, context.$index, rules);
        } else {
            return expression;
        }
    }
};