function ModelClassGenerator(individualClassGenerator, modelConfiguration, tmpDir) {
    this.individualClassGenerator = individualClassGenerator;
    this.modelConfiguration = modelConfiguration;
    this.tmpDir = tmpDir;
};

ModelClassGenerator.prototype.generate = function () {
    return Object.keys(this.modelConfiguration).map(modelName => {
        return {
            type: modelName,
            sources: this.individualClassGenerator(modelName, this.modelConfiguration[modelName])
        };
    });
};

module.exports = ModelClassGenerator;