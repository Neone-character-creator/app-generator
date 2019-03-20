const yup = require("yup");
const _ = require("lodash");

function valueShape(acceptableTypeNames) {
    return function (value) {
        switch (typeof value) {
            case "string":
                return value.required ? yup.string().required().oneOf(acceptableTypeNames) : yup.string().oneOf(acceptableTypeNames).notRequired;
            default:
                throw new Error(`Received ${typeof value} but expected only string`);
        }
    }
}

function typeShape(acceptableTypes) {
    return function (configurationFragment) {
        const shape = {
            properties: Object.keys(configurationFragment).reduce((reduced, next) => {
                reduced[next] = valueShape(acceptableTypes)(configurationFragment[next]);
                return reduced;
            }, {})
        };
        return yup.object().required().shape(shape);
    }
}

module.exports = function (configuration) {
    if (!configuration.model) {
        throw new Error("model is a required field");
    }
    const typeNames = Object.keys(configuration.model).concat(["number", "string"]);
    if (!typeNames.includes("character")) {
        throw new Error("A model named 'character' must be defined.");
    }
    const shapeCreator = typeShape(typeNames);
    const characterShape = shapeCreator(_.get(configuration, "model.character.properties", {})).test("character", "${path} must have at least one property", (value) => {
        return Object.keys(value || {}).length > 0;
    });
    return yup.object().shape({
        model: yup.object().required().shape(Object.keys(_.get(configuration, "model", {})).filter(_ => _ !== "character").reduce((reduced, next) => {
            reduced[next] = shapeCreator(_.get(configuration, "model[next].properties", {}));
            return reduced;
        }, {
            character: characterShape
        }))
    }).validateSync(configuration, {
        strict: true,
        abortEarly: false
    });
};