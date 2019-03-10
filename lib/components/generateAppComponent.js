const template = require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/app-template"), "utf-8");
module.exports = async function(appConfig) {
    try {
        const generatedContent = await replaceName(appConfig, template)
            .then(replaceViews.bind(null, appConfig))
            .then(replaceImports.bind(null, appConfig));
        return generatedContent;
    } catch (e) {
        throw e;
    }
};

async function replaceName(config, generatedContent) {
    return generatedContent.replace(/%appName%/g, config.name);
}

async function replaceViews(config, generatedContent) {
    const viewsReplacementMatcher = /^([ \t+]+)%views%/gm;
    const leadingWhitespace = viewsReplacementMatcher.exec(generatedContent)[1];
    const replacementText = Object.keys(config.views).map(viewName => {
        return `${leadingWhitespace}<${camelCaseViewName(viewName)}>`
    }).join('\n');
    return generatedContent.replace(viewsReplacementMatcher, replacementText);
}

async function replaceImports(config, generatedContent) {
    const injectedImports = Object.keys(config.views).map(viewName => {
        return `import * as ${camelCaseViewName(viewName)} from "../components/${camelCaseViewName(viewName)}"`
    }).join('\n');
    return generatedContent.replace(/%imports%/g, injectedImports);
}

function camelCaseViewName(name){
    return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase() + "View";
}