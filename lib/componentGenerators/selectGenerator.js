const genericGenerator = require("./genericGenerator");
const _ = require("lodash");

function SelectGenerator() {
    return genericGenerator(SelectGenerator.defaultFunctionality);
};

SelectGenerator.defaultFunctionality = [
    {
        replaces: "itemText",
        transform: function(appConfig){
            return function (componentConfig) {
                return function(content){
                    return content.replace("${itemText}", componentConfig.items.text);
                }
            }
        }
    },
    {
        replaces: "values",
        required: {
            propertyPath: "items.values"
        },
        transform: function(appConfig) {
            return function (componentConfig) {
                return function (content) {
                    return content.replace("${values}", JSON.stringify(componentConfig.items.values));
                }
            }
        }
    }
];

module.exports = SelectGenerator()("select");