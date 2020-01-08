import * as _ from "lodash";
import models from "../models";
import * as interpreter from "../interpreter/index";

function calculateDiff(newValue, oldValue) {
    if (_.isNumber(newValue) && _.isNumber(oldValue)) {
        return oldValue - newValue;
    } else if (_.isArray(newValue) && _.isArray(oldValue)) {
        return _.difference(newValue, oldValue);
    } else {
        throw new Error("Tried to find diff between a " + typeof newValue + " and a " + typeof oldValue + " which isn't supported");
    }
}

export default class PropertyBaseValueCalculator {
    constructor() {
        this.lastCycleBaseValues = {};
    }

    calculate(propertyContext, ancestorDefinitions, state, statePath, valuesCalculatedLastCycle){
        const joinedStatePath = statePath[0] + statePath.slice(1).map(element => "[" + element + "]").join("");
        if(propertyContext.baseValue) {
            const currentValue = _.get(state, joinedStatePath);
            const previousBaseValue = _.get(this.lastCycleBaseValues, joinedStatePath) || (propertyContext.type === "number" ? 0 : []);
            const userChanges = calculateDiff(currentValue, previousBaseValue);
            const newBaseValue = propertyContext.baseValue.reduce((accumulator, nextExpression) => {
                return interpreter.default.interpret(nextExpression, {$state: state, $models: models, $this: accumulator}, true)
                    || accumulator;
            }, propertyContext.type === "number" ? 0 : []);
            const newValue = _.isArray(currentValue) ? newBaseValue.concat(userChanges) : newBaseValue + userChanges;
            const lastCalculatedValue = previousCalculatedValues[joinedStatePath];
            _.set(state, joinedStatePath, newValue);
            if(!_.isEqual(lastCalculatedValue, newValue)) {
                valuesCalculatedLastCycle[joinedStatePath] = newValue;
                this.lastCycleBaseValues[joinedStatePath] = newBaseValue;
            }
        }
        if(propertyContext.modelDefinition) {
            Object.keys(propertyContext.modelDefinition.properties).forEach(nextPropertyName => {
                const parentScopes = ancestorDefinitions ? [...ancestorDefinitions, propertyContext.modelDefinition] : [propertyContext.modelDefinition];
                const nextPropertyContext = propertyContext.modelDefinition.properties[nextPropertyName];
                nextPropertyContext.modelDefinition = _.get(models, nextPropertyContext.type + ".prototype.definition");
                const propertyPath = [...statePath, nextPropertyName];
                this.calculate(nextPropertyContext, parentScopes, state, propertyPath, valuesCalculatedLastCycle);
            });
        }
    }
}