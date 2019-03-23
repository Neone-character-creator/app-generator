const fs = require('fs-extra');

const duplateProjectTemplateDirectory = require('./duplicateProjectTemplateDirectory');
module.exports = async function (configuration, scaffold) {
    const projectName = configuration.appName;
    const modelConfiguration = require("./modelValidation")(configuration);
    return duplateProjectTemplateDirectory(projectName)
        .then(tmpDir => {
            return require("./extractProjectFilePaths")(tmpDir)
                .then(paths => {
                    return Promise.all([Promise.all(paths.map(p => {
                        return require('./replacePlaceholderStringsInFileContent')(p, {
                            appName: projectName
                        })
                    })),
                        Promise.all(paths.map(p => {
                            return require('./replacePlaceholdersInPaths')(p, {
                                appName: projectName
                            })
                        }))
                    ])
                })
                .then(() => {
                    require('./cleanupEmptyDirectories')(tmpDir)
                })
                .then(() => {
                    return require('./componentGenerator')(configuration);
                })
                .then(generatedComponents => {
                    return require("./moveGeneratedComponents")(generatedComponents, tmpDir);
                })
                .then(() => {
                    fs.copy(tmpDir, `./plugin-${projectName}`);
                }).then(() => {
                    console.log(`Your newly generated app is available at plugin-${projectName}. Enter that directory and run 'npm start' to get a demo of your new app.`)
                });
        });
};