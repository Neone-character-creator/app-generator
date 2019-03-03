const argv = require('yargs').argv;
const fs = require('fs-extra');

if (!argv.projectName) {
    throw new Error("--projectName missing");
}

const projectDirectory = argv.projectName;

const clean = !fs.existsSync(projectDirectory);

if (!clean) {
    throw new Error('Output directory already exists. Delete it or choose a different project name.');
}
require('./lib/duplicateProjectTemplateDirectory')(argv.projectName)
    .then(tmpDir => {
        fs.copy(tmpDir, `./plugin-${argv.projectName}`);
    });