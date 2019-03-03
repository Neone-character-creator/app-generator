const tmp = require('tmp');

module.exports = async function duplicateTemplateFiles(newProjectName) {
    console.log("Generating temporary project directory.");

    return new Promise((resolve, reject) => {
        tmp.dir((err, path) => {
            const tempProjectDirectory = require('path').resolve(path, newProjectName);
            console.log(`Copying template directory in ${tempProjectDirectory}`);
            require('ncp')("project-template", tempProjectDirectory, (err) => {
                if (err) {
                    return reject(err);
                }
                console.log("Finished generating project directory.");
                return resolve(tempProjectDirectory);
            })
        })
    })
}