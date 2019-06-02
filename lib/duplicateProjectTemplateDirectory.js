module.exports = async function duplicateTemplateFiles(newProjectName, tmpDir) {
    console.log("Generating temporary project directory.");

    return new Promise((resolve, reject) => {
        const tempProjectDirectory = require('path').resolve(path, newProjectName);
        console.log(`Copying template directory in ${tempProjectDirectory}`);
        const timeout = setTimeout(reject.bind(null, "Took over 10 seconds to copy!"), 10000);
        require('ncp')("project-template", tempProjectDirectory, (err) => {
            if (err) {
                return reject(err);
            }
            console.log("Finished generating project directory.");
            clearTimeout(timeout);
            return resolve({tmpDir: tempProjectDirectory});
        })
    })
};