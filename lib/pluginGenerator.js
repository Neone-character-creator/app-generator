const fs = require('fs-extra');
const appConfigTransformer = require("./model/transformers/app");

const duplateProjectTemplateDirectory = require('./duplicateProjectTemplateDirectory');
const _ = require("lodash");

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
    this.configuration = appConfigTransformer(configuration);
    this.tmpDir = tmpDir;
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
PluginGenerator.prototype.moveGeneratedComponents = require("./moveGeneratedComponents");
PluginGenerator.prototype.copyToTargetDirectory = (projectName, tmpDir) => {
    fs.copy(tmpDir, `./plugin-${projectName}`);
};
PluginGenerator.prototype.generate = async function () {
    const projectName = this.configuration.appName;
    return this.duplicateProjectDirectory(projectName, this.tmpDir)
        .then(invokeWithInput(this.extractProjectFilePaths, {as: "projectFilePaths"}, "tmpDir"))
        .then(invokeWithInput(this.replacePlaceholderStrings.bind(null, projectName), false, "projectFilePaths"))
        .then(invokeWithInput(this.cleanupEmptyDirectories, false, "tmpDir"))
        .then(invokeWithInput(this.generateCompoents.bind(null, this.configuration), {as: "generatedComponents"}))
        .then(invokeWithInput(this.moveGeneratedComponents, false, "generatedComponents", "tmpDir"))
        .then(invokeWithInput(this.copyToTargetDirectory.bind(null, projectName), false, "tmpDir"))
        .then(() => {
            console.log(`Your newly generated app is available at plugin-${projectName}. Enter that directory and run 'npm start' to get a demo of your new app.`)
        });
};

module.exports = PluginGenerator;