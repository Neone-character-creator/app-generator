const pascalCaseName = require("../pascalCaneName");
const genericGenerator = require("./genericGenerator");

function ContainerGenerator(){
    return genericGenerator(ContainerGenerator.defaultFunctionality);
}

ContainerGenerator.defaultFunctionality = [
    {
        replaces: "children",
        transform: function (appConfig) {
            return function (componentConfig) {
                return function (generatedContent) {
                    const childrenReplacementMatcher = /^([ \t+]+)%children%/gm;
                    // const leadingWhitespace = childrenReplacementMatcher.exec(generatedContent)[1];
                    const replacementText = (componentConfig.children || []).map(childName => {
                        const childConfig = appConfig.components[childName];
                        return `<Grid item>` + "\n" +
                        `<${pascalCaseName(childName)}${pascalCaseName(childConfig.type)} />` + "\n" +
                        "</Grid>"
                            ;
                    }).join('\n');
                    return generatedContent.replace(childrenReplacementMatcher, replacementText);
                }
            }
        }
    },
];

module.exports = ContainerGenerator()("container");