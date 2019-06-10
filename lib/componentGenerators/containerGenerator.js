const pascalCaseName = require("../pascalCaneName");
const genericGenerator = require("./genericGenerator");

function ContainerGenerator() {
    return genericGenerator(ContainerGenerator.defaultFunctionality);
}

ContainerGenerator.defaultFunctionality = [
    {
        replaces: "additionalImports",
        transform: function(app){
            return function (component) {
                return function (replacers) {
                    replacers.imports = `import Grid from "@material-ui/core/Grid";`;
                    return replacers;
                }
            }
        }
    },
    {
        replaces: "children",
        transform: function (appConfig) {
            return function (componentConfig) {
                const itemSize = (() => {
                        if (componentConfig.direction == "horizontal") {
                            switch (componentConfig.children.length) {
                                case 1:
                                    return 12;
                                case 2:
                                    return 6;
                                case 3:
                                case 5:
                                    return 4;
                                case 6:
                                    return 2;
                                default:
                                    return 3;
                            }
                        } else {
                            return 12;
                        }
                    }
                )();
                return function (transformers) {
                    // const leadingWhitespace = childrenReplacementMatcher.exec(generatedContent)[1];
                    const replacementText = (componentConfig.children || []).map(childName => {
                        const childConfig = appConfig.components[childName];
                        return `<Grid item xs={${itemSize}}>` + "\n" +
                            `<${pascalCaseName(childName)}${pascalCaseName(childConfig.type)} />` + "\n" +
                            "</Grid>"
                            ;
                    }).join('\n');
                    return {...transformers,
                        children: replacementText
                    }
                }
            }
        }
    },
];

module.exports = ContainerGenerator()("container");