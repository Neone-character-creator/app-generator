const yup = require("yup");

const stringDefault = {
    type: "string",
    default: ""
};

const numberDefault = {
    type: "number",
    default: 0
};
const booleanDefault = {
    type: "boolean",
    default: false
};

module.exports = function (allModels) {
    const modelNames = Object.keys(allModels).concat(["string", "number"]);
    return function (config) {
        const properties = Object.keys(config.properties || {}).reduce((mapped, next) => {
            const type = config.properties[next].type || config.properties[next];
            if (type === "string") {
                mapped[next] = yup.string();
            } else if (type === "number") {
                mapped[next] = yup.number();
            } else if (type.match(/\[.*\]/)) {
                mapped[next] = yup.array();
            } else if (type === "boolean") {
                mapped[next] = yup.boolean();
            } else {
                mapped[next] = yup.object();
            }
            return mapped;
        }, {});
        const definitionSchema = yup.object(Object.keys(config.properties || {}).reduce((mapped, next) => {
            mapped[next] = yup.object({
                type: yup.string().required(),
            }).transform((current, original) => {
                if (typeof original === "string") {
                    switch (original) {
                        case "number":
                            return numberDefault;
                        case "string":
                            return stringDefault;
                        case "boolean":
                            return booleanDefault;
                        default:
                            return {
                                type: original
                            }
                    }
                } else {
                    switch (original.type) {
                        case "number":
                            return {...numberDefault, ...current};
                        case "string":
                            return {...stringDefault, ...current};
                        case "boolean":
                            return {...booleanDefault, ...current};
                        default:
                            return original;
                    }
                }
            }).test("object or string", "$path", v => typeof v === "string" || typeof v === "object");
            return mapped;
        }, {})).required();
        return yup.object().shape({
            properties: definitionSchema,
            values: yup.array().of(yup.object(properties))
        }).required().default(undefined);
    }
};