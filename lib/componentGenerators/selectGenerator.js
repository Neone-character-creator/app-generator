const genericGenerator = require("./genericGenerator");
const _ = require("lodash");

function SelectGenerator() {
    return genericGenerator(SelectGenerator.defaultFunctionality);
};

SelectGenerator.defaultFunctionality = [
    {
        replaces: "bind",
        transform: function(appConfig){
            return function(componentConfig){
                return function(content){
                    return content.replace("${bind}", componentConfig.bind)
                }
            }
        }
    },
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
                    return content.replace("${values}", componentConfig.items.values);
                }
            }
        }
    }
];

module.exports = SelectGenerator()("select");