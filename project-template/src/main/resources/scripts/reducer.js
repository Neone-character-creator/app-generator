const _ = require("lodash");
const models = require("./models");
const interpreter = require("./interpreter");

function setCalculatedProperties(modelDefinition, state, statePath){
    if (modelDefinition.derivedFrom) {
        let value = modelDefinition.derivedFrom.reduce((valueSoFar, nextExpression) =>
            interpreter.resolve(nextExpression, {},{state, models, accumulator: valueSoFar})
            , null);
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

module.exports = function(previousState, action) {
    if(previousState) {
        previousState = {...previousState};
        if (action.type === "SET") {
            _.set(previousState, action.path, action.value);
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
    return previousState;
};