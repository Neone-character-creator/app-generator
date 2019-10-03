import rules from "!../rules.json";
import models from "../models";
import _ from "lodash";

const interpreter = {
    interpret: function (expression, context) {
        context = {
            $state: context.$state,
            $models: models,
            $rules: rules,
            $index: _.get(context, "$index"),
            $this: _.get(context, "$this")
        };
        if (typeof expression === "string" && expression.startsWith("#")) {
            return new Function("$state", "$models", "$this", "$rules", "$index", `return ${expression.substring(1)}`).bind(context, context.$state, context.$models, context.$this, context.$rules, context.$index)();
        } else if (expression && (expression.any || expression.all)) {
            expression.any
        } else {
            return expression;
        }
    }
};

function evaluateObjectProperties(context, object) {
    const definition = object.__proto__.definition;
    return Object.keys(object).reduce((mapped, nextProp) => {
        const propDef = _.get(definition, nextProp);
        const derivedFrom = _.get(propDef, "derivedFrom");
        if (_.isArray(derivedFrom)) {
            mapped[nextProp] = derivedFrom.reduce((accumulator, nextExpression) => {
                return interpreter.interpret(nextExpression, {...context,
                    $this: {...object, accumulator}
                });
            }, null);
        } else {
            mapped[nextProp] = interpreter.interpret(derivedFrom || object[nextProp], {...context, $this: context.$this || object});
        }
        return mapped;
    }, new object.__proto__.constructor());
}

export default interpreter;

export {evaluateObjectProperties};