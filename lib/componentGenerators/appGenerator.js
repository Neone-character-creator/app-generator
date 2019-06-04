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
                        const matched = viewsReplacementMatcher.exec(generatedContent);
                        if(matched) {
                            const leadingWhitespace = matched[1];
                            const replacementText = appConfig.views.map(viewName => {
                                return `${leadingWhitespace}`+
                                    `<TabPanel>` + "\n" +
                                    `${leadingWhitespace}` +
                                    `<${pascalCaseName(viewName)}View/>` + "\n" +
                                    `${leadingWhitespace}` +
                                    `</TabPanel>`
                                    ;
                            }).join('\n');
                            return generatedContent.replace(viewsReplacementMatcher, replacementText);
                        }
                        return generatedContent;
                    }
                }
            }
        },
        {
            replaces: "viewNames",
            transform: function(appConfig){
                return function(){
                    return function(content){
                        return content.replace(/%viewNames%/, appConfig.views.map(view=>{
                            return `<Tab>` + "\n" +
                            `${pascalCaseName(view)}` + "\n" +
                            "</Tab>"
                        }).join("\n"))
                    }
                }
            }
        }
    ]
)("app")("app");