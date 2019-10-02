import _ from "lodash";
import interpreter from "../interpreter";

const evaluateRequirements = function(requirements, context) {
    if (requirements === undefined) {
        return true;
    }
    if (_.isFunction(requirements)) {
        return requirements(context);
    }
    var localContext = {...context};
    if (_.isString(requirements)) {
        return interpreter.interpret(requirements, localContext);
    } else if (_.isArray(requirements)) {
        return evaluateArrayOfExpressions(requirements, localContext);
    } else if (_.isObject(requirements)) {
        if (requirements.any) {
            return requirements.any.reduce((anyMeet, expression) => {
                return anyMeet || evaluateRequirements(expression, localContext);
            }, false);
        } else if (requirements.all) {
            return requirements.all.reduce((anyMeet, expression) => {
                return anyMeet && evaluateRequirements(expression, localContext);
            }, requirements.all.length > 0);
        } else {
            return evaluateComparisonObject(requirements, context);
        }
    }
}

const evaluateArrayOfExpressions = function(expressions, context) {
    return expressions.reduce((accumulator, nextExpression) => {
        const localContext = {...context};
        _.set(localContext, '$this.accumulator', accumulator);
        return interpreter.interpret(nextExpression, localContext);
    }, [])
}

const evaluateComparisonObject = function(comparison, context) {
    const evaluatedPath = interpreter.interpret(comparison.path, context);
    const evaluatedValue = _.get(context, evaluatedPath);
    if (comparison.lessThan !== undefined) {
        return evaluatedValue < comparison.lessThan;
    } else if (comparison.contains) {
        return _.isArray(evaluatedValue) && evaluatedValue.map(ev => ev.id).includes(comparison.contains);
    } else if (comparison.equals) {
        return comparison.equals === evaluatedValue;
    }
};

export default evaluateRequirements;