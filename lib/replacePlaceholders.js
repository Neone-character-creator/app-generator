module.exports = function(string, replacements) {
    return Object.keys(replacements).reduce((replaced, replacementKey) => {
        const pattern = `%${replacementKey}%`;
        const afterReplacement = replaced.replace(new RegExp(pattern, 'g'), replacements[replacementKey]);
        return afterReplacement;
    }, string);
};