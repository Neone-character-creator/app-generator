const fs = require('fs-extra');
const path = require("path");

const duplateProjectTemplateDirectory = require('./duplicateProjectTemplateDirectory');
const _ = require("lodash");

const ModelClassGenerator = require("./classGenerator");
const ModelClassWriter = require("./model/writer");

function invokeWithInput(funcToCall, addToInput, ...propertiesToExtractFrominput) {
    return function (input) {
        var invocationReturnValue = funcToCall.apply(null, propertiesToExtractFrominput.map(prop => _.get(input, prop)))
        if (addToInput) {
            var toAdd = {};
            toAdd[addToInput.as] = invocationReturnValue;
            return {...input, ...toAdd};
        }
        return input;
    }
}

function PluginGenerator(configuration, tmpDir) {
    this.configuration = configuration;
    this.tmpDir = tmpDir;
    this.modelClassGenerator = new ModelClassGenerator(configuration.model, tmpDir);
    this.modelClassWriter = ModelClassWriter;
}

PluginGenerator.prototype.duplicateProjectDirectory = duplateProjectTemplateDirectory;
PluginGenerator.prototype.extractProjectFilePaths = require("./extractProjectFilePaths");
PluginGenerator.prototype.replacePlaceholderStrings = (projectName, paths) => {
    return [Promise.all(paths.map(p => {
        return require('./replacePlaceholderStringsInFileContent')(p, {
            appName: projectName
        })
    })),
        Promise.all(paths.map(p => {
            return require('./replacePlaceholdersInPaths')(p, {
                appName: projectName
            })
        }))
    ]
};
PluginGenerator.prototype.cleanupEmptyDirectories = require("./cleanupEmptyDirectories");
PluginGenerator.prototype.generateCompoents = require("./componentGenerator");
PluginGenerator.prototype.moveGeneratedFiles = require("./moveGeneratedComponents");
PluginGenerator.prototype.copyToTargetDirectory = (projectName, tmpDir) => {
    fs.copy(tmpDir, `./plugin-${projectName}`);
};
PluginGenerator.prototype.generateModels = function(){
    return this.modelClassGenerator.generate()
};
PluginGenerator.prototype.writeModelFile = function(rootDir, classSources){
    return this.modelClassWriter(rootDir, classSources);
};
PluginGenerator.prototype.writeRulesFile = function(configuration, tmpDir){
    return fs.writeFileSync(path.resolve(tmpDir, "src", "main", "resources", "scripts", "rules.json"), JSON.stringify(configuration.rules), "UTF-8");
};
PluginGenerator.prototype.writeHooksFile = function(configuration, tmpDir){
    return fs.writeFileSync(path.resolve(tmpDir, "src", "main", "resources", "scripts", "hooks.json"), JSON.stringify(configuration.hooks), "UTF-8");
};
PluginGenerator.prototype.generate = async function () {
    const projectName = this.configuration.appName;
    return this.duplicateProjectDirectory(projectName, this.tmpDir)
        .then(invokeWithInput(this.extractProjectFilePaths, {as: "projectFilePaths"}, "tmpDir"))
        .then(invokeWithInput(this.replacePlaceholderStrings.bind(this, projectName), false, "projectFilePaths"))
        .then(invokeWithInput(this.cleanupEmptyDirectories.bind(this), false, "tmpDir"))
        .then(invokeWithInput(this.generateCompoents.bind(this, this.configuration), {as: "generatedComponents"}))
        .then(invokeWithInput(this.generateModels.bind(this), {as: "modelClassSources"}, "tmpDir"))
        .then(invokeWithInput(this.writeRulesFile.bind(this, this.configuration), false, ["tmpDir"]))
        .then(invokeWithInput(this.writeModelFile.bind(this), false, "tmpDir", "modelClassSources"))
        .then(invokeWithInput(this.writeHooksFile.bind(this, this.configuration), false, "tmpDir"))
        .then(invokeWithInput(this.moveGeneratedFiles.bind(this), false, "generatedComponents", "tmpDir"))
        .then(invokeWithInput(this.copyToTargetDirectory.bind(this, projectName), false, "tmpDir"))
        .then(() => {
            console.log(`Your newly generated app is available at plugin-${projectName}. Enter that directory and run 'npm start' to get a demo of your new app.`)
        });
};

module.exports = PluginGenerator;