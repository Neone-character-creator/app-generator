const individualGenerator = require("./model/modelClassSourceGenerator");

function ModelClassGenerator(modelConfiguration, tmpDir) {
    this.modelConfiguration = modelConfiguration;
    this.tmpDir = tmpDir;
};

ModelClassGenerator.prototype.generate = function(){
    return Object.keys(this.modelConfiguration).reduce((reduced, modelName) => {
        reduced[modelName] = individualGenerator(this.modelConfiguration[modelName]);
        return reduced;
    }, {});
};

module.exports = ModelClassGenerator;