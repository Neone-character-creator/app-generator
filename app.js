const ncp = require('ncp');
const argv = require('yargs').argv;
const fs = require('fs');
const path = require('path');

if (!argv.projectName) {
    throw new Error("--projectName missing");
}

const projectDirectory = argv.projectName;

if (fs.existsSync(projectDirectory)) {
    throw new Error('Output directory already exists.');
}

async function duplicateTemplateFiles() {
    console.log("Generating project directory.");
    return new Promise((resolve, reject) => {
        ncp("template", projectDirectory, (err) => {
            if (err) {
                return reject(err);
            }
            console.log("Finished generating project directory.");
            return resolve()
        })
    })
}

function replaceStrings(file) {
    return new Promise(((resolve, reject) => {
        fs.readFile(file, {
            encoding: 'utf-8'
        }, (err, data) => {
            if (err) {
                reject(err)
            }
            data = data.replace(/\{projectName\}/g, argv.projectName);
            fs.writeFile(file, data);
        })
    }))
}

function traverseProjectFiles(filePath) {
    const originalPath = path.resolve(__dirname, filePath);
    const updatedPath = originalPath.replace(/\{projectName\}/g, argv.projectName);
    fs.renameSync(originalPath, updatedPath);
    fs.readdir(updatedPath, (err, files) => {
        if (err) {
            throw new Error(err)
        }
        files.forEach(name => {
            const fullPath = path.resolve(__dirname, filePath, name);
            if (fs.lstatSync(fullPath).isDirectory()) {
                traverseProjectFiles(path.join(filePath, name));
            } else {
                replaceStrings(fullPath);
            }
        });
    });
}

duplicateTemplateFiles().then(traverseProjectFiles.bind(null, projectDirectory));