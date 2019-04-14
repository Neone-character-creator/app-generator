const _ = require("lodash");
const pascalCaseName = require("../pascalCaneName");

/**
 * Creates a generator with the functionality specified in the first parameter.
 *
 * The functionality object required the following methods:
 * replaceImports: (appConfig: object) => (componentConfig: object) => (content: string) => transformedContent : string
 * replaceChildren: (appConfig: object) => (componentConfig: object) => (content: string) => transformedContent : string
 * replaceOtherProperties: (appConfig: object) => (componentConfig: object) => (content: string) => transformedContent : string
 *
 * @param functionality
 * @returns {function(*=): function(*=): Function}
 * @constructor
 */
function Generator(functionality) {
    if (_.isNil(functionality)) {
        throw new Error("Functionality object is undefined or null");
    }
    assertHasHandlerMethod("replaceImports")(functionality);
    assertHasHandlerMethod("replaceChildren")(functionality);
    assertHasHandlerMethod("replaceOtherProperties")(functionality);
    return function (componentType) {
        if (typeof  componentType !== 'string') {
            throw new Error(`Component type must be a string, was ${typeof componentType}`);
        }

        const template = (() => {
            switch (componentType) {
                // Fixme: Replace with configuration object.
                case "app":
                    return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/app-template"), "utf-8");
                case "view":
                    return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/view-template"), "utf-8");
                case "container":
                    return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/container-template"), "utf-8");
                case "textfield":
                    return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/textfield-template"), "utf-8");
                case "number":
                    return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/number-template"), "utf-8");
                case "label":
                    return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/label-template"), "utf-8");
                case "checkbox":
                    return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/checkbox-template"), "utf-8");
                default:
                    throw new Error(`component type ${componentType} not supported`);
            }
        })();

        return function (componentName) {
            if (componentType === "app" && componentName !== "app") {
                throw new Error("If type is app, name must be app as well.");
            }

            return function (appConfig) {

                const componentConfig = {...appConfig.components[componentName], ...{
                    appName: appConfig.appName,
                    name: componentName
                }};

                if (componentType === "view" && _.isEmpty(componentConfig.children)) {
                    throw new Error("A view cannot have 0 children");
                }
                try {
                    const generatedContent = [template]
                        .map(content => functionality.replaceImports(appConfig)(componentConfig)(content))
                        .map(content => functionality.replaceChildren(appConfig)(componentConfig)(content))
                        .map(content => functionality.replaceOtherProperties(appConfig)(componentConfig)(content))
                        [0];
                    return generatedContent;
                } catch (e) {
                    throw e;
                }
            };
        }
    }
};

module.exports = Generator.bind(Generator);

function replaceName(config, generatedContent) {
    return generatedContent.replace(/%appName%/g, config.appName);
}

function replaceViewImports(viewName, config) {
    return function (generatedContent) {
        const imports = {};
        if (!config.components[viewName].children) {
            throw new Error(`Children for view ${viewName} are missing, a view must have at least one child.`);
        }
        const injectedImports = config.components[viewName].children.map(childName => {
            const childConfig = config.components[childName];
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
};

function defaultReplaceChildren(componentName, appConfig) {
    return function (generatedContent) {
        const childrenReplacementMatcher = /^([ \t+]+)%children%/gm;
        // const leadingWhitespace = childrenReplacementMatcher.exec(generatedContent)[1];
        const replacementText = (appConfig.components[componentName].children || []).map(childName => {
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
};

function replaceSimpleProperties(componentName, appConfig, initialContent) {

}

function replaceComponentName(componentName, generatedContent) {
    return generatedContent.replace(/%componentName%/gm, componentName);
}

function assertHasHandlerMethod(methodName) {
    return function(objectToTest) {
        return _.has(objectToTest, methodName) && _.isFunction(objectToTest[methodName]);
    }
}