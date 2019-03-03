const replacePlaceholders = require('./replacePlaceholders');
const fs = require('fs-extra');
const paths = require('path');
module.exports = function (filePath, replacements) {
    if (!replacements || typeof replacements !== 'object') {
        throw new Error(`Replacements must be a non-null object`);
    }
    const postReplacement = replacePlaceholders(filePath, replacements);
    if (filePath !== postReplacement && fs.existsSync(filePath)) {
        fs.ensureDirSync(paths.resolve(postReplacement, '..'))
        return fs.renameSync(filePath, postReplacement);
    } else {
        return undefined;
    }
};