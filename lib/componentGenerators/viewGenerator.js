const GenericGenerator = require("./GenericGenerator");
const pascalCaseName = require("../pascalCaneName");

module.exports = GenericGenerator({
    replaceImports: function (appConfig) { // FIXME: Duplicated in genericGenerator
        return function (componentConfig) {
            return function (content) {
                const imports = {};
                if (!appConfig.components[componentConfig.name].children) {
                    throw new Error(`Children for view ${componentConfig.name} are missing, a view must have at least one child.`);
                }
                const injectedImports = appConfig.components[componentConfig.name].children.map(childName => {
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
                return content.replace(/%imports%/g, injectedImports);
            };
        };
    },
})("view");