const _ = require("lodash");

const interpreter = {
    resolve: function(expression, context, globals){
        if(expression.startsWith("=")) {
            return interpreter.resolve(expression.substring(2).trim(), context, globals);
        }
        return interpreter.resolveLiteral(expression, context, globals);
    },
    resolveLiteral: function(expression, context, globals) {
        if(expression.startsWith("$character")) {
            const property = expression.substring("$character".length + 1);
            return _.get(globals.state.character, property, null);
        } else if (expression.match(/".*"/)){
            return expression; //Return string literally.
        } else {
            return Number.parseInt(expression);
        }
    }
};

module.exports = interpreter;