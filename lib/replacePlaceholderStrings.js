module.exports = function(input, replacements) {
    if (!replacements || typeof replacements !== 'object') {
        throw new Error(`Replacements must be a non-null object`);
    }
    return Object.keys(replacements).reduce((replaced, replacementKey) => {
        return replaced.replace(new RegExp(`%${replacementKey}%`, 'g'), replacements[replacementKey]);
    }, input);
};