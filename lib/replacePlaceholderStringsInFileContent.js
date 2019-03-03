const fs = require('fs-extra');
module.exports = function (path, replacements) {
    if (!replacements || typeof replacements !== 'object') {
        throw new Error(`Replacements must be a non-null object`);
    }
    const input = fs.readFileSync(path, 'utf-8');
    const postReplacement = Object.keys(replacements).reduce((replaced, replacementKey) => {
        const pattern = `%${replacementKey}%`;
        const afterReplacement = replaced.replace(new RegExp(pattern, 'g'), replacements[replacementKey]);
        return afterReplacement;
    }, input);
    return fs.writeFileSync(path, postReplacement);
};