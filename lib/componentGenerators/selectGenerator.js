const genericGenerator = require("./genericGenerator");
const _ = require("lodash");

function SelectGenerator() {
    return genericGenerator(SelectGenerator.defaultFunctionality);
};

SelectGenerator.defaultFunctionality = [
    {
        transform: function(appConfig){
            return function(componentConfig){
                return function(content){
                    return content.replace("%bind%", componentConfig.bind)
                }
            }
        }
    },
    {
        transform: function(appConfig){
            return function (componentConfig) {
                return function(content){
                    return content.replace("%itemText%", componentConfig.items.text);
                }
            }
        }
    }
];

module.exports = SelectGenerator()("select");