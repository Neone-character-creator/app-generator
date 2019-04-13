"use strict";
const genericGenerator = require("./genericGenerator");

module.exports = genericGenerator({
    replaceImports: function (config) {
        return function (generatedContent) {
            const injectedImports = config.views.map(viewName => {
                return `import ${this.prototype.pascalCaseName(viewName)}View from "./${this.prototype.pascalCaseName(viewName)}View"`
            }).join('\n');
            return generatedContent.replace(/%imports%/g, injectedImports);
        }.bind(this)
    },
    replaceChildren: function (config) {
        return function (generatedContent) {
            const viewsReplacementMatcher = /^([ \t+]+)%views%/gm;
            const leadingWhitespace = (viewsReplacementMatcher.exec(generatedContent) || [null, null])[1];
            const replacementText = leadingWhitespace ? config.views.map(viewName => {
                return `${leadingWhitespace}<${this.prototype.pascalCaseName(viewName)}View/>`
            }).join('\n') : "";
            return generatedContent.replace(viewsReplacementMatcher, replacementText);
        }.bind(this)
    }
    })("app")("app");