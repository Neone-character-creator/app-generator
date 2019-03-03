const argv = require('yargs').argv;
const fs = require('fs-extra');

if (!argv.projectName) {
    throw new Error("--projectName missing");
}

const projectDirectory = argv.projectName;

const clean = !fs.existsSync(`plugin-${projectDirectory}`);

if (!clean) {
    throw new Error('Output directory already exists. Delete it or choose a different project name.');
}
require('./lib/duplicateProjectTemplateDirectory')(argv.projectName)
    .then(tmpDir => {
        return require("./lib/extractProjectFilePaths")(tmpDir)
            .then(paths => {
                return Promise.all([Promise.all(paths.map(p => {
                    return require('./lib/replacePlaceholderStringsInFileContent')(p, {
                        appName: argv.projectName
                    })
                })),
                    Promise.all(paths.map(p => {
                        return require('./lib/replacePlaceholdersInPaths')(p, {
                            appName: argv.projectName
                        })
                    }))
                ])
            })
            .then(() => {
                fs.copy(tmpDir, `./plugin-${argv.projectName}`);
            });
    });