const yup = require("yup");
const _ = require("lodash");

function valueShape(acceptableTypeNames) {
    return function (value) {
        if (_.isArray(value)) {
            value = value[0];
        }
        if (typeof value !== "string") {
            throw new Error("Properties can only be strings");
        }
        if (!acceptableTypeNames.includes(value)) {
            throw new Error(`Type was ${value} but must be one one ${acceptableTypeNames.join(", ")}`);
        }
        switch (typeof value) {
            case "string":
                return yup.string().required().oneOf(acceptableTypeNames);
        }
    }
}

function typeShape(acceptableTypes) {
    return function (configurationFragment) {
        if (!configurationFragment.properties){
            throw new Error("Element missing required properties object");
        }
        const { properties } = configurationFragment;
        const shape = {
            properties: Object.keys(properties).reduce((reduced, next) => {
                reduced[next] = valueShape(acceptableTypes)(properties[next]);
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
    const characterConfiguration = _.get(configuration, "model.character");
    const characterShape = shapeCreator(characterConfiguration).test("character", "${path} must have at least one property", (value) => {
        return Object.keys(value).length > 0;
    });
    return yup.object().shape({
        model: yup.object().required().shape(Object.keys(_.get(configuration, "model", {})).filter(_ => _ !== "character").reduce((reduced, next) => {

            reduced[next] = shapeCreator(_.get(configuration, `model[${next}]`, {}));
            return reduced;
        }, {
            character: characterShape
        }))
    }).validateSync(configuration, {
        strict: true,
        abortEarly: false
    });
};