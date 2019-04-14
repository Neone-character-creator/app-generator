"use strict";
const pascalCaseName = require("../pascalCaneName");
const GenericGenerator = require("./genericGenerator");
/**
 * Specialized generator for generating App components.
 */
module.exports = GenericGenerator({
    replaceImports: function (config) {
        return function () {
            return function (generatedContent) {
                const injectedImports = config.views.map(viewName => {
                    return `import ${pascalCaseName(viewName)}View from "./${pascalCaseName(viewName)}View"`
                }).join('\n');
                return generatedContent.replace(/%imports%/g, injectedImports);
            }
        }
    },
    replaceChildren: function (appConfig) {
        return function () {
            return function (generatedContent) {
                const viewsReplacementMatcher = /^([ \t+]+)%children%/gm;
                const leadingWhitespace = (viewsReplacementMatcher.exec(generatedContent) || [null, ""])[1];
                const replacementText = appConfig.views.map(viewName => {
                    return `${leadingWhitespace}<${pascalCaseName(viewName)}View/>`
                }).join('\n');
                return generatedContent.replace(viewsReplacementMatcher, replacementText);
            }
        }
    }
})("app")("app");