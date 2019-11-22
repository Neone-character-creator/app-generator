const genericGenerator = require("./genericGenerator");
const _ = require("lodash");

function TextfieldGenerator() {
    return genericGenerator(TextfieldGenerator.defaultFunctionality);
}

TextfieldGenerator.defaultFunctionality = [
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
                    }
                }
            }
        }
    }
];

module.exports = TextfieldGenerator()("textfield")