const individualGenerator = require("./model/modelClassSourceGenerator");

function ModelClassGenerator(modelConfiguration, tmpDir) {
    this.modelConfiguration = modelConfiguration;
    this.tmpDir = tmpDir;
};

ModelClassGenerator.prototype.generate = function () {
    return Object.keys(this.modelConfiguration).map(modelName => {
        return {
            type: modelName,
            source: individualGenerator(modelName, this.modelConfiguration[modelName])
        };
    });
};

ModelClassGenerator.prototype.transform = function (configuration) {
    return appConfigTransformer()
};

module.exports = ModelClassGenerator;