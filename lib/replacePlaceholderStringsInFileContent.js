const replacePlaceholders = require('./replacePlaceholders');
const fs = require('fs-extra');
module.exports = function (path, replacements) {
    if (!replacements || typeof replacements !== 'object') {
        throw new Error(`Replacements must be a non-null object`);
    }
    const input = fs.readFileSync(path, 'utf-8');
    const postReplacement = replacePlaceholders(input, replacements);
    return fs.writeFileSync(path, postReplacement);
};