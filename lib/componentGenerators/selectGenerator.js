const genericGenerator = require("./genericGenerator");
const _ = require("lodash");

function SelectGenerator() {
    return genericGenerator(SelectGenerator.defaultFunctionality);
};

SelectGenerator.defaultFunctionality = [
    {
        replaces: "imports",
        transform: function(appConfig){
            return function(componentConfig) {
                return function (content) {
                    //Additional imports should not be required.
                    return content;
                }
            }
        }
    },
    {
        replaces: "children",
        transform: function (appConfig) {
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
    }
];

module.exports = SelectGenerator()("select");