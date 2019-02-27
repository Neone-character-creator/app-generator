const template = require('fs').readFileSync(require("path").resolve(__dirname, "../code-templates/app-template"), "utf-8");
module.exports = async function(appConfig) {
    try {
        const generatedContent = await replaceName(appConfig, template)
            .then(replaceViews.bind(null, appConfig));
        return generatedContent;
    } catch (e) {
        throw e;
    }
};

async function replaceName(config, generatedContent) {
    return generatedContent.replace(/%name%/g, config.name);
}

async function replaceViews(config, generatedContent) {
    const viewsReplacementMatcher = /^([ \t+]+)%views%/gm;
    const leadingWhitespace = viewsReplacementMatcher.exec(generatedContent)[1];
    const replacementText = Object.keys(config.views).map(viewName => {
        return `${leadingWhitespace}<${viewName.substring(0,1).toUpperCase()}${viewName.substring(1).toLowerCase()}View>`
    }).join('\n');
    return generatedContent.replace(viewsReplacementMatcher, replacementText);
}