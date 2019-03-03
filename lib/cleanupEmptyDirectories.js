const fs = require('fs-extra');
const paths = require('path');

function deleteEmptyDirectories(path) {
    const stats = fs.statSync(path);
    if (stats.isDirectory()) {
        const children = fs.readdirSync(path);
        if (!children.length) {
            fs.rmdirSync(path)
            return true;
        } else {
            return children.reduce((x, child) => {
                return x || deleteEmptyDirectories(paths.resolve(path, child));
            }, false);
        }
    } else {
        return false;
    }
}

module.exports = deleteEmptyDirectories;