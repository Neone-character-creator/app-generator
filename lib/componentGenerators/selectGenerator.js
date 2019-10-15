const genericGenerator = require("./genericGenerator");
const _ = require("lodash");

function SelectGenerator() {
    return genericGenerator(SelectGenerator.defaultFunctionality);
};

SelectGenerator.defaultFunctionality = [
    {
        replaces: "itemText",
        transform: function (appConfig) {
            return function (componentConfig) {
                return function (transformers) {
                    return {
                        ...transformers,
                        itemText: componentConfig.items.text ? `'${componentConfig.items.text}'` : `undefined`
                    };
                }
            }
        }
    },
    {
        replaces: "values",
        required: {
            propertyPath: "items.values"
        },
        transform: function (appConfig) {
            return function (componentConfig) {
                return function (transformers) {
                    return componentConfig.items.values ?
                    {
                        ...transformers,
                        values: componentConfig.items.values
                    } : transformers;
                }
            }
        }
    },
    {
        replaces: "selectionCount",
        transform: function(){
            return function(componentConfig){
                return function (transformers) {
                    return {
                        ...transformers,
                        selectionCount: componentConfig.items.maxSelections ? `"${componentConfig.items.maxSelections}"` : `1`
                    }
                }
            }
        }
    },
    {
        replaces:"displayExpression",
        transform: function(){
            return function(componentConfig){
                return function(transformers) {
                    return {
                        ...transformers,
                        displayExpression: componentConfig.items.translate ? `"${componentConfig.items.translate}"` : "undefined"
                    }
                }
            }
        }
    },
    {
        replaces: "itemDisabledWhen",
        transform: function(){
            return function(componentConfig) {
                return function(transformers){
                    return {
                        ...transformers,
                        itemDisabledWhen: componentConfig.items.disabledWhen ? `"${componentConfig.items.disabledWhen}"` : 'undefined'
                    }
                }
            }
        }
    }
];

module.exports = SelectGenerator()("select");