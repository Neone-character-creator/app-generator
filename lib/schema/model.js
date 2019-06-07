const yup = require("yup");

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
            } else {
                mapped[next] = yup.object();
            }
            return mapped;
        }, {});
        const definitionSchema = yup.object(Object.keys(config.properties || {}).reduce((mapped, next) => {
            mapped[next] = yup.object({
                type: yup.string().required(),
            }).transform((current, original) => {
                if(typeof original === "string") {
                    return {
                        type: original
                    }
                }
                return current;
            }).test("object or string", "$path", v => typeof v === "string" || typeof v === "object");
            return mapped;
        }, {})).required();
        return yup.object().shape({
            properties: definitionSchema,
            values: yup.array().of(yup.object(properties))
        });
    }
};