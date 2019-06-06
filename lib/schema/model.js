const yup = require("yup");

module.exports = function (config) {
    const properties = yup.object().shape(Object.keys(config.properties || {}).reduce((mapped, next) => {
        const propertyConfig = config.properties[next];
        if (typeof propertyConfig === "string") {
            switch (propertyConfig) {
                case "string":
                    mapped[next] = yup.string().required();
                    break;
                case "number":
                    mapped[next] = yup.number().required();
                    break;
            }
        }
        return mapped;
    }, {})).required();
    return yup.object().shape({
        properties: properties,
        values: yup.array().of(properties)
    }).strict();
};