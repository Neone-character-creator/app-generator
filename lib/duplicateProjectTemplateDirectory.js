module.exports = async function duplicateTemplateFiles(newProjectName, tmpDir) {
    console.log("Generating temporary project directory.");

    return new Promise((resolve, reject) => {
        const tempProjectDirectory = require('path').resolve(tmpDir, newProjectName);
        console.log(`Copying template directory in ${tempProjectDirectory}`);
        const timeout = setTimeout(reject.bind(null, "Copying seems to be taking a long time. This can occurs if the project template contains a node_modules directory."), 2500);
        require('ncp')("project-template", tempProjectDirectory, {
            errs: console.error
        }, (err) => {
            if (err) {
                return reject(err);
            }
            console.log("Finished generating project directory.");
            clearTimeout(timeout);
            return resolve({tmpDir: tempProjectDirectory});
        })
    })
};