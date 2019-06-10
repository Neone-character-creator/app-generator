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
                        itemText: `"${componentConfig.items.text}"`
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
    }
];

module.exports = SelectGenerator()("select");