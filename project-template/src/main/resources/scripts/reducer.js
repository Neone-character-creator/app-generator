import * as _ from "lodash";
import models from "./models";
import interpreter from "./interpreter";
import rules from "!./rules.json";

const baseValues = {};

function setCalculatedProperties(modelDefinition, state, statePath) {
    if (modelDefinition.baseValue) {
        const originalBaseValue = _.get(baseValues, statePath) || 0;
        const differenceFromOriginalBase = (_.get(state, statePath) - originalBaseValue) || 0;
        const baseValue = modelDefinition.baseValue.reduce((accumulator, nextExpression) => {
                return interpreter.interpret(nextExpression, {$state: state, $models: models, $this: accumulator}, true)
                    || accumulator;
            }, 0);
        if (originalBaseValue !== baseValue) {
            _.set(baseValues, statePath, baseValue);
        }
        _.set(state, statePath, baseValue + differenceFromOriginalBase);
    } else if (modelDefinition.derivedFrom) {
        let value = modelDefinition.derivedFrom.reduce((valueSoFar, nextExpression) => {
                return interpreter.interpret(nextExpression, {$state: state, $models: models, $this: valueSoFar})
            }, null);
        _.set(state, statePath, value);
    }
    Object.getOwnPropertyNames(modelDefinition).reduce((updated, nextPropertyName) => {
        const modelProperty = modelDefinition[nextPropertyName];
        const propertyModelDefinition = models[modelDefinition[nextPropertyName].type] ? models[modelDefinition[nextPropertyName].type].prototype.definition : undefined;
        const propertyPath = statePath + `['${nextPropertyName}']`;
        if (modelProperty.derivedFrom || modelProperty.baseValue) {
            setCalculatedProperties(modelProperty, state, propertyPath);
        } else if (propertyModelDefinition) {
            setCalculatedProperties(propertyModelDefinition, state, propertyPath);
        }
    }, state);
}

function setAvailableAdvancements(state) {
    const sharedContext = {
        $state: state,
        $model: models,
    };
    state.availableAdvancements = Object.keys(rules.advancement).reduce((advancements, availableAdvancementType) => {
        const advancementRule = rules.advancement[availableAdvancementType];
        let concreteOptions;
        if (typeof advancementRule.options === "string") {
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

function applyAdvancements(state) {
    (state.character.advancements || []).forEach(advancement => {
        interpreter.interpret(rules.advancement[advancement.type].effect, {
            $state: state,
            $this: advancement.value.option,
            $rules: rules,
            $model: models
        });
    });
};

export default function (previousState, action) {
    if (previousState) {
        previousState = {...previousState};
        if (action.type === "SET") {
            const path = (() => {
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
        if (action.type === "ADVANCEMENT") {
            const tokens = action.value.split(" ");
            const type = tokens[0];
            const value = interpreter.interpret("return " + tokens[1], {
                $state: previousState,
                $model: models,
                $rules: rules,
            });
            previousState.character.advancements.push({
                type,
                value
            })
        }
    } else {
        previousState = {character: new models.character()};
    }
    setCalculatedProperties(models.character.prototype.definition, previousState, "character");
    applyAdvancements(previousState);
    setAvailableAdvancements(previousState);
    return previousState;
};