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

module.exports = transform;