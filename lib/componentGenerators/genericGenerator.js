const pascalCaseName = require("../pascalCaneName");
const abstractGenerator = require("./abstractGenerator");

function GenericGenerator(overrideTransformers) {
    overrideTransformers = overrideTransformers || [];
    return abstractGenerator([...GenericGenerator.defaultFunctionality].map(defaultTransformer => {
        const overrideTransformer = overrideTransformers.find(ot => {
            return ot.replaces === defaultTransformer.replaces;
        });
        return overrideTransformer || defaultTransformer;
    }).concat(overrideTransformers));
};

GenericGenerator.defaultFunctionality = [
    {
        replaces: "imports",
        transform:  function (appConfig) {
            return function (componentConfig) {
                return function (generatedContent) {
                    const imports = {};
                    const injectedImports = (componentConfig.children || []).map(childName => {
                        const childConfig = appConfig.components[childName];
                        switch (childConfig.type) {
                            case "textfield":
                            case "number":
                            case "container":
                            case "label":
                            case "checkbox":
                            case "select":
                                if (!imports[childName]) {
                                    imports[childName] = true;
                                    return `import ${pascalCaseName(childName)}${pascalCaseName(childConfig.type)} from './${pascalCaseName(childName)}${pascalCaseName(childConfig.type)}';`
                                }
                                break;
                            default:
                                throw new Error(`Import for type ${childConfig.type} not supported.`);
                        }

                    }).filter(_ => _).join('\n');
                    return generatedContent.replace(/%imports%/g, injectedImports);
                }
            }
        }
    },
    {
        replaces: "children",
        transform: function (appConfig) {
            return function (componentConfig) {
                return function (generatedContent) {
                    const childrenReplacementMatcher = /^([ \t+]+)%children%/gm;
                    // const leadingWhitespace = childrenReplacementMatcher.exec(generatedContent)[1];
                    const replacementText = (componentConfig.children || []).map(childName => {
                        const childConfig = appConfig.components[childName];
                        // Fixme: Replace with configuration object.
                        return `<${pascalCaseName(childName)}${pascalCaseName(childConfig.type)} />`;
                    }).join('\n');
                    return generatedContent.replace(childrenReplacementMatcher, replacementText);
                }
            }
        }
    },
    {
        transform: function (appConfig) {
            return function (componentConfig) {
                return function (content) {
                    const componentPropertiesReplaced = [content].map(ic => {
                        return Object.getOwnPropertyNames(componentConfig).reduce((generatedContent, nextProperty) => {
                            const replaced = generatedContent.replace(new RegExp(`%${nextProperty}%`, 'g'), componentConfig[nextProperty]);
                            return replaced;
                        }, ic);
                    });
                    const emptyPropertiesReplace = componentPropertiesReplaced[0].replace(/%.*%/g, "");
                    return emptyPropertiesReplace;
                }
            }
        }
    }
];

module.exports = GenericGenerator;