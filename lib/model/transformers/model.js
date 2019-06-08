function transform(modelProperties) {
    return Object.getOwnPropertyNames(modelProperties).reduce((transformed, nextKey) => {
        if (typeof modelProperties[nextKey] === "string") {
            transformed[nextKey] = {
                type: modelProperties[nextKey]
            };
            switch (typeof modelProperties[nextKey]) {
                case "string":
                    transformed[nextKey].default = "";
                    break;
                case "number":
                    transformed[nextKey].default = 0;
            }
        } else {
            transformed[nextKey] = modelProperties[nextKey];
        }
        return transformed;
    }, {})
}

module.exports = function (config) {
    return Object.getOwnPropertyNames(config).reduce((entireConfig, modelName) => {
        entireConfig[modelName] = {...config[modelName], ...{properties: transform(config[modelName].properties)}};
        return entireConfig;
    }, {});
};