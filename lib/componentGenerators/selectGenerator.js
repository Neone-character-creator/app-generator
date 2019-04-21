const pascalCaseName = require("../pascalCaneName");
const abstractGenerator = require("./abstractGenerator");
const genericGenerator = require("./genericGenerator");
const _ = require("lodash");

function SelectGenerator() {
    return abstractGenerator({...genericGenerator.defaultFunctionality, ...SelectGenerator.defaultFunctionality});
};

SelectGenerator.defaultFunctionality = {
    replaceImports: function(appConfig){
        return function(componentConfig) {
            return function (content) {
                //Additional imports should not be required.
                return content;
            }
        }
    },
    replaceChildren: function (appConfig) {
        return function (componentConfig) {
            return function (content) {
                if (_.isNil(componentConfig.values) || _.isEmpty(componentConfig.values)) {
                    throw new Error("A select must have a non-null array of at least one value");
                }
                const childrenReplacementMatcher = /^([ \t+]+)%children%/gm;
                // const leadingWhitespace = childrenReplacementMatcher.exec(generatedContent)[1];
                const replacementText = (componentConfig.values).map((value, index) => {
                    // Fixme: Replace with configuration object.
                    return `<MenuItem id="select-${componentConfig.componentName}-value-${index}" value=${value}>${value}</MenuItem>`;
                }).join('\n');
                return content.replace(childrenReplacementMatcher, replacementText);
            }
        }
    }
};

module.exports = SelectGenerator()("select");