const pascalCaseName = require("../pascalCaneName");
const abstractGenerator = require("./abstractGenerator");

function GenericGenerator(functionality) {
    return abstractGenerator({...GenericGenerator.defaultFunctionality, ...functionality});
};

GenericGenerator.defaultFunctionality = {
    replaceImports: function (appConfig) {
        return function (componentConfig) {
            return function (generatedContent) {
                const imports = {};
                const injectedImports = (componentConfig.children || []).map(childName => {
                    const childConfig = appConfig.components[childName];
                    switch (childConfig.type) {
                        case "textfield":
                        case "number":
                            if (!imports.textField) {
                                imports.textField = true;
                                return `import TextField from "@material-ui/core/TextField";`;
                            }
                            return undefined;
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
    },
    replaceChildren: function (appConfig) {
        return function (componentConfig) {
            return function (generatedContent) {
                const childrenReplacementMatcher = /^([ \t+]+)%children%/gm;
                // const leadingWhitespace = childrenReplacementMatcher.exec(generatedContent)[1];
                const replacementText = (componentConfig.children || []).map(childName => {
                    const childConfig = appConfig.components[childName];
                    // Fixme: Replace with configuration object.
                    switch (childConfig.type) {
                        case "textfield": {
                            let label = childConfig.label;
                            if (!label) {
                                label = childName;
                            }
                            return `<TextField label="${label}" id="${childName}" value="" />`;
                        }
                        case "number": {
                            let label = childConfig.label;
                            if (!label) {
                                label = childName;
                            }
                            return `<TextField type="number" label="${label}" id="${childName}" value="" />`;
                        }
                        case "container":
                            return `<Grid item xs>\n` +
                                `<${pascalCaseName(childName)}${pascalCaseName(childConfig.type)} />\n` +
                                `</Grid>`;
                        case "label":
                        case "checkbox":
                            return `<${pascalCaseName(childName)}${pascalCaseName(childConfig.type)} />`;
                        default:
                            throw new Error(`${childConfig.type} is not supported as a child.`);
                    }
                }).join('\n');
                return generatedContent.replace(childrenReplacementMatcher, replacementText);
            }
        }
    },
    replaceOtherProperties: function (appConfig) {
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

module.exports = GenericGenerator;