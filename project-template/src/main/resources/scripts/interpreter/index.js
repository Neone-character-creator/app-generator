import rules from "!../rules.json";
import models from "../models";
const interpreter = {
    interpret: function(expression, context){
        if (typeof expression === "string" && expression.startsWith("#")) {
            return new Function("$state", "$models", "$this", "$rules", "$index", `return ${expression.substring(1)}`)(context.$state, models, context.$this, rules, context.$index);
        } else if(expression && (expression.any || expression.all)) {
            expression.any
        } else {
            return expression;
        }
    }
};
export default interpreter;