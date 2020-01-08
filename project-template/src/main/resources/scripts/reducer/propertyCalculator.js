import DerivedPropertyCalculator from "./derivedPropertyCalculator";
import PropertyBaseValueCalculator from "./propertyBaseValueCalculator";
import * as _ from "lodash";

export default class PropertyCalculator{
    constructor() {
        this.derivedPropertyCalculator = new DerivedPropertyCalculator();
        this.propertyBaseValueCalculator = new PropertyBaseValueCalculator();
        this.propertiesEvaluatedLastCycle = {};
    }


    calculate(modelPrototype, state, statePath){
        let evaluationCount = 0;
        let evaluationCycleProperties = [];
        do {
            if (evaluationCount > 2) {
                const currentCycleChangedProperties = evaluationCycleProperties[evaluationCount - 1];
                if (Object.keys(currentCycleChangedProperties).length) {
                    const message = "Calculated property evaluation took more than 3 iterations. This likely is caused by a circular reference, where properties are causing each other to change in an infinite loop" + "\n" +
                        "The following properties were modified in the last evaluation cycle: " + Object.keys(currentCycleChangedProperties).map(k => k + " = " + currentCycleChangedProperties[k]).join("\n");
                    throw new Error(message);
                }
            }
            // Calculate properties with derivedFrom configuration
            const derivedPropertiesCalculated = this.derivedPropertyCalculator.calculate(modelPrototype, [], state, statePath, this.propertiesEvaluatedLastCycle);
            // Calculate properties with baseValue configuration

            if (Object.keys(derivedPropertiesCalculated).length) {
                evaluationCycleProperties[evaluationCount] = derivedPropertiesCalculated;
            }
            this.propertiesEvaluatedLastCycle = derivedPropertiesCalculated;
            evaluationCount++;
        } while (!_.isEmpty(evaluationCycleProperties[evaluationCount - 1]));
        this.propertyBaseValueCalculator.calculate(modelPrototype, [], state, statePath, this.propertiesEvaluatedLastCycle);
        return evaluationCount;
    }
}