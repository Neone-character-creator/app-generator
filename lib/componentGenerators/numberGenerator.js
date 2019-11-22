const genericGenerator = require("./genericGenerator");
const _ = require("lodash");

function NumberGenerator() {
    return genericGenerator(NumberGenerator.defaultFunctionality);
}

NumberGenerator.defaultFunctionality = [
    {
        replaces: "action",
        transform: function () {
            return function () {
                return function (replacers) {
                    return {
                        ...replacers,
                        action: JSON.stringify({
                            type: "SET"
                        })
                    };
                }
            }
        }
    }
];

module.exports = NumberGenerator()("number")