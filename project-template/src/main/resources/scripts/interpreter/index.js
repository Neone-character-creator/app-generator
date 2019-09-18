import rules from "!../rules.json";
const interpreter = {
    interpret: function(expression, context){
        if (typeof expression === "string" && expression.startsWith("#")) {
            return new Function("$state", "$model", "$this", "$rules", "$index", `return ${expression.substring(1)}`)(context.$state, context.$model, context.$this, rules, context.$index);
        } else if(expression && (expression.any || expression.all)) {
            expression.any
        } else {
            return expression;
        }
    }
};