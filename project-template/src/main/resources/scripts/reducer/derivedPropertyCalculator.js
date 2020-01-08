import models from "../models";
import * as _ from "lodash";
import * as interpreter from "../interpreter";

function validateArguments(propertyContext, ancestorDefinitions, state, statePath) {
    validatePropertyContext(propertyContext);
    validateAncestorDefinitions(ancestorDefinitions);
    validateState(state);
    validateStatePath(statePath);
}

function validatePropertyContext(context){
    if(!_.isObject(context)) {
        throw new Error("propertyContext must be an object but was " + typeof context);
    }
    if (context.type === undefined) {
        throw new Error("propertyContext has an undefined type!");
    }
}

function validateAncestorDefinitions(ancestorDefinitions) {
    if(!_.isArray(ancestorDefinitions)) {
        throw new Error("ancestorDefinitions must be an array!");
    }
}

function validateState(state){
    if(!_.isObject(state)) {
        throw new Error("state must be an object!")
    }
}

function validateStatePath(statePath){
    if(!_.isArray(statePath)) {
        throw new Error("statePath must be an array!")
    }
    _.each(statePath, (v, index) => {
        if(!_.isString(v)) {
            throw new Error("Value at index " + index + " must be a string but was " + typeof v);
        }
    })
}

export default class DerivedPropertyCalculator {

    /**
     *
     * @param propertyContext       the context of the property to calculate
     * @param ancestorDefinitions   the property definitions of the
     * @param state                 the current state
     * @param statePath             the path from the root of the state to the current property, as an array of string path elements
     */
    calculate(propertyContext, ancestorDefinitions, state, statePath, valuesCalculatedLastCycle) {
        validateArguments(propertyContext, ancestorDefinitions, state, statePath);
        let evaluatedProperties = {};
        const joinedStatePath = statePath[0] + statePath.slice(1).map(element => "[" + element + "]").join("");
        if (propertyContext.derivedFrom) {
            let newValue = propertyContext.derivedFrom.reduce((accumulator, nextExpression) => {
                const localContext = {
                    $state: state,
                    $models: models,
                    $this: {
                        modelDefinition: propertyContext.modelDefinition,
                        path: statePath,
                        accumulator,
                        ancestors: statePath.filter((x, i) => i < statePath.length - 1).map((element, index) => {
                            const joined = statePath.filter((x, i) => {
                                return i <= index;
                            }).map(x => "[" + x + "]").join("");
                            return _.get(state, joined);
                        }).reverse()
                    }
                };
                return (interpreter.interpret || interpreter.default.interpret)(nextExpression, localContext);
            }, _.get(state, joinedStatePath));
            _.set(state, joinedStatePath, newValue);
            if (!_.isEqual(valuesCalculatedLastCycle[joinedStatePath], newValue)) {
                evaluatedProperties[joinedStatePath] = newValue;
            }
        }
        // FIXME: Different "definitions" are actually different objects.
        if (_.get(propertyContext, "modelDefinition.properties")) {
            Object.getOwnPropertyNames(propertyContext.modelDefinition.properties).reduce((updated, nextPropertyName) => {
                const parentScopes = ancestorDefinitions ? [...ancestorDefinitions, propertyContext.modelDefinition] : [propertyContext.modelDefinition];
                const nextPropertyContext = propertyContext.modelDefinition.properties[nextPropertyName];
                nextPropertyContext.modelDefinition = _.get(models, nextPropertyContext.type + ".prototype.definition");
                const propertyPath = [...statePath, nextPropertyName];
                const subPropertyCalculationResult = this.calculate(nextPropertyContext, parentScopes, state, propertyPath, valuesCalculatedLastCycle);
                evaluatedProperties = _.merge(evaluatedProperties, subPropertyCalculationResult);
            }, state);
        }
        return evaluatedProperties;
    };
}