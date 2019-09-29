import rules from "!../rules.json";
import models from "../models";
import { store } from "../app";

function calculateProperties(value) {
    if(_.isArray(value)) {
        return value.map(av => calculateProperties(av));
    } else if (_.isObject(value) && value.definition) {
        return Object.keys(value).reduce((translated, nextProperty) => {
            if(_.get(value, `definition[${nextProperty}].derivedFrom`)) {
                const derivationExpressions = _.isArray(value.definition[nextProperty].derivedFrom) ?
                    value.definition[nextProperty].derivedFrom :
                    [value.definition[nextProperty].derivedFrom];
                translated[nextProperty] = derivationExpressions.reduce((accumulator, next) =>{
                    const context = {
                        $this: {...value,
                            accumulator,
                            definition: value.definition
                        }
                    };
                    return interpreter.interpret(next, context);
                }, null)
            } else {
                translated[nextProperty] = calculateProperties(value[nextProperty]);
            }
            return translated;
        }, {});
    } else {
        return interpreter.interpret(value);
    }
}

const calcuableModels = Object.keys(models).reduce((mapped, nextModelName) => {
    const modelDef = models[nextModelName];
    mapped[nextModelName] = {
        ...modelDef, values: function () {
            return modelDef._values.map(calculateProperties);
        }
    };
    mapped[nextModelName].prototype = modelDef.prototype;
    return mapped;
}, {});

const interpreter = {
    interpret: function (expression, context) {
        context = {
            $state: _.get(context ,"$state") ? context.$state : store.getState(),
            $models: calcuableModels,
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
export default interpreter;