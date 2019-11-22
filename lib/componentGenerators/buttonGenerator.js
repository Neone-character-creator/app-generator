const genericGenerator = require("./genericGenerator");
const _ = require("lodash");

function ButtonGenerator() {
    return genericGenerator(ButtonGenerator.defaultFunctionality);
}

ButtonGenerator.defaultFunctionality = [
    {
        replaces: "action",
        transform: function () {
            return function (componentConfig) {
                return function (replacers) {
                    return {
                        ...replacers,
                        action: _.isObject(componentConfig.action) ? JSON.stringify(componentConfig.action) : `"${componentConfig.action}"`
                    }
                }
            }
        }
    }
];

module.exports = ButtonGenerator()("button")