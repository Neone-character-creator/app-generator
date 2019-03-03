const fs = require('fs-extra')
const paths = require('path');

function traverse(foundPaths) {
    return function (path) {
        const stat = fs.statSync(path);
        if (stat.isFile()) {
            foundPaths.push(path)
        } else {
            const children = fs.readdirSync(path).map(c => {
                return paths.resolve(path, c);
            });
            children.forEach(traverse(foundPaths));
        }
    }
}

module.exports = function (projectDirectory) {
    return new Promise((resolve, reject) => {
        try {
            const finalPaths = [];
            traverse(finalPaths)(projectDirectory);
            resolve(finalPaths);
        } catch (e) {
            reject(e);
        }
    })
};