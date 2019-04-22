const pascalCaseName = require("../pascalCaneName");
const abstractGenerator = require("./abstractGenerator");

function GenericGenerator(overrideTransformers) {
    overrideTransformers = overrideTransformers || [];
    return abstractGenerator([...GenericGenerator.defaultFunctionality.map(transform => {
        const override = overrideTransformers.find(ot => {
            return ot.replaces === transform.replaces;
        });
        if (override) {
            return override
        } else {
            return transform;
        }
    })]);
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
                                if (!imports[childName]) {
                                    imports[childName] = true;
                                    return `import ${pascalCaseName(childName)}${pascalCaseName(childConfig.type)} from './${pascalCaseName(childName)}${pascalCaseName(childConfig.type)}';`
                                }
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
                    return componentPropertiesReplaced[0];
                }
            }
        }
    }
];

module.exports = GenericGenerator;