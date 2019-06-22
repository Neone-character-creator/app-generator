import * as _ from "lodash";
import models from "./models";
import interpreter from "./interpreter";
import rules from "!./rules.json";

function setCalculatedProperties(modelDefinition, state, statePath){
    if (modelDefinition.derivedFrom) {
        let value = modelDefinition.derivedFrom.reduce((valueSoFar, nextExpression) => {
                return interpreter.interpret(nextExpression, {$state: state, $models: models, $this: valueSoFar})
            }, null);
        _.set(state, statePath, value);
    }
    Object.getOwnPropertyNames(modelDefinition).reduce((updated, nextPropertyName) => {
        const modelProperty = modelDefinition[nextPropertyName];
        const propertyModelDefinition = models[modelDefinition[nextPropertyName].type] ? models[modelDefinition[nextPropertyName].type].prototype.definition : undefined;
        const propertyPath = statePath + `['${nextPropertyName}']`;
        if (modelProperty.derivedFrom) {
            setCalculatedProperties(modelProperty, state, propertyPath);
        } else if (propertyModelDefinition){
            setCalculatedProperties(propertyModelDefinition, state, propertyPath);
        }
    }, state);
}

function setAvailableAdvancements(state){
    const sharedContext = {
        $state: state,
        $model: models,
    };
    state.availableAdvancements = Object.keys(rules.advancement).reduce((advancements, availableAdvancementType) =>{
        const advancementRule = rules.advancement[availableAdvancementType];
        let concreteOptions;
        if(typeof advancementRule.options === "string"){
            concreteOptions = interpreter.interpret(advancementRule.options, sharedContext);
        } else {
            concreteOptions = advancementRule.options;
        }
        concreteOptions = concreteOptions.map(option => {
            const localContext = {...sharedContext, $this: option};
            const cost = interpreter.interpret(advancementRule.cost, localContext);
            const isAvailable = interpreter.interpret(advancementRule.when, localContext);
            return {
                option,
                cost,
                isAvailable: isAvailable && cost <= _.get(localContext, advancementRule.uses)
            }
        });

        advancements[availableAdvancementType] = {
            options: concreteOptions
        };
        return advancements;
    }, {});
}

export default function(previousState, action) {
    if(previousState) {
        previousState = {...previousState};
        if (action.type === "SET") {
            const path = (()=>{
                if (action.path.startsWith("$state")) {
                    return action.path.substring("$state.".length);
                }
            })();
            _.set(previousState, path, action.value);
        }
        if (action.type === "REMOVE") {
            const array = _.get(previousState, action.path);
            if (!_.isArray(array)) {
                throw new Error(`value at path ${action.path} is not array!`);
            }
            array.splice(action.remove);
        }
        if (action.type === "ADD") {
            const array = _.get(previousState, action.path);
            if (!_.isArray(array)) {
                throw new Error(`value at path ${action.path} is not array!`);
            }
            array.push(action.value);
        }
    } else {
        previousState = {character: new models.character()};
    }
    setCalculatedProperties(models.character.prototype.definition, previousState, "character");
    setAvailableAdvancements(previousState);
    return previousState;
};