const yup = require("yup");

module.exports = function (config) {
    return yup.object().shape({
        properties: yup.object().shape(Object.keys(config.properties || {}).reduce((mapped, next) => {
            const propertyConfig = config.properties[next];
            if (typeof propertyConfig === "string") {
                switch (propertyConfig) {
                    case "string":
                        mapped[next] = yup.string().required();
                    case "number":
                        mapped[next] = yup.string().required();
                }
            }
            return mapped;
        }, {})).required()
    }).strict();
};