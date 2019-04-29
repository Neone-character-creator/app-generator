function transform(config) {
    return Object.getOwnPropertyNames(config).reduce((transformed, nextKey) => {
        if(typeof config[nextKey] === "string") {
            transformed[nextKey] = {
                type: "string"
            }
        }
        return transformed;
    }, {})
}

module.exports = function(appConfig){
    if (!appConfig.components) {
        throw new Error("components undefined");
    }
    if (appConfig.model) {
        throw new Error("model undefined");
    }
    return Object.assign(appConfig, {
        components: transform(appConfig.components),
        model: transform(appConfig.model)
    });
};