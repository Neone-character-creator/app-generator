const fs = require('fs-extra');

const duplateProjectTemplateDirectory = require('./duplicateProjectTemplateDirectory');
module.exports = async function (projectName, scaffold) {
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
                .then(async () => {
                    if (scaffold) {
                        try {
                            const configFile = await require("./configurationSchema")(JSON.parse(fs.readFileSync(typeof scaffold === "string" ? `${scaffold}.json` : `${projectName}.json`, 'utf-8')));
                            return require('./generateComponentsHierarchy').default(configFile);
                        } catch (e) {
                            console.error("Failed to load app config file:", e);
                            throw e;
                        }
                    }
                })
                .then(componentHierarchy => {
                    return require('./componentGenerator')(componentHierarchy);
                })
                .then(() => {
                    fs.copy(tmpDir, `./plugin-${projectName}`);
                }).then(() => {
                    console.log(`Your newly generated app is available at plugin-${projectName}. Enter that directory and run 'npm start' to get a demo of your new app.`)
                });
        });
};