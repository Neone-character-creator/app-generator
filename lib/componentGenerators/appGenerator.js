"use strict";
const pascalCaseName = require("../pascalCaneName");
const GenericGenerator = require("./genericGenerator");
/**
 * Specialized generator for generating App components.
 */
module.exports = GenericGenerator(
    [
        {
            replaces: "imports",
            transform: function (config) {
                return function () {
                    return function (generatedContent) {
                        const injectedImports = config.views.map(viewName => {
                            return `import ${pascalCaseName(viewName)}View from "./${pascalCaseName(viewName)}View"`
                        }).join('\n');
                        return generatedContent.replace(/%imports%/g, injectedImports);
                    }
                }
            }
        },
        {
            replaces: "children",
            transform: function (appConfig) {
                return function () {
                    return function (generatedContent) {
                        const viewsReplacementMatcher = /^([ \t+]+)%children%/gm;
                        const leadingWhitespace = viewsReplacementMatcher.exec(generatedContent)[1];
                        const replacementText = appConfig.views.map(viewName => {
                            return `${leadingWhitespace}<${pascalCaseName(viewName)}View/>`
                        }).join('\n');
                        return generatedContent.replace(viewsReplacementMatcher, replacementText);
                    }
                }
            }
        }
    ]
)("app")("app");