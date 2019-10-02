const fs = require('fs-extra');
const paths = require('path');

function deleteEmptyDirectories(path) {
    return _deleteEmptyDirectories(path, false);
}

function _deleteEmptyDirectories(path, deleteRoot) {
    const stats = fs.statSync(path);
    if (stats.isDirectory()) {
        const children = fs.readdirSync(path);
        if (!children.length) {
            fs.rmdirSync(path);
            console.info(`${path} is empty, removing`);
            return true;
        } else {
            deleteRoot = children.reduce((x, child) => {
                return x || _deleteEmptyDirectories(paths.resolve(path, child), true);
            }, false) && deleteRoot;
            if (deleteRoot) {
                return _deleteEmptyDirectories(path, true);
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}

module.exports = deleteEmptyDirectories;