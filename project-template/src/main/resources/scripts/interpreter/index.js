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
            $this: _.get(context, "$this"),
            $temp: _.get(context.$state, "$temp", {})
        };
        if (typeof expression === "string" && expression.startsWith("#")) {
            return new Function("$state", "$models", "$this", "$rules", "$index", "$temp", `return ${expression.substring(1)}`).bind(context, context.$state, context.$models, context.$this, context.$rules, context.$index, context.$temp)();
        } else if (expression && (expression.any || expression.all)) {
            expression.any
        } else {
            return expression;
        }
    }
};

function evaluateObjectProperties(context, object) {
    const definition = object.__proto__.definition;
    return _.union(Object.keys(object), Object.keys(definition || {})).reduce((mapped, nextProp) => {
        const propDef = _.get(definition, nextProp);
        const derivedFrom = _.get(propDef, "derivedFrom");
        if (_.isArray(derivedFrom)) {
            mapped[nextProp] = derivedFrom.reduce((accumulator, nextExpression) => {
                _.set(context, "$this.accumulator", accumulator);
                return interpreter.interpret(nextExpression, context);
            }, null);
        } else {
            mapped[nextProp] = interpreter.interpret(derivedFrom || object[nextProp], {...context, $this: context.$this || object});
        }
        return mapped;
    }, new object.__proto__.constructor());
}

export default interpreter;

export {evaluateObjectProperties};