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
 * @param transformers
 * @returns {function(*=): function(*=): Function}
 * @constructor
 */
function Generator(transformers) {
    if (_.isNil(transformers)) {
        throw new Error("Functionality object is undefined or null");
    }
    assertHasHandlerMethod("imports")(transformers);
    assertHasHandlerMethod("children")(transformers);
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
                case "select":
                    return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/select-template"), "utf-8");
                default:
                    throw new Error(`component type ${componentType} not supported`);
            }
        })();

        return function (componentName) {
            if (componentType === "app" && componentName !== "app") {
                throw new Error("If type is app, componentName must be app as well.");
            }

            return function (appConfig) {

                const componentConfig = {...appConfig.components[componentName], ...{
                    appName: appConfig.appName,
                    componentName: componentName
                }};

                if (componentConfig.type !== componentType) {
                    throw new Error(`The component configuration type of ${componentConfig.type} and the generator configuration type of ${componentType} are different for components ${componentName}.`);
                }

                if (componentType === "view" && _.isEmpty(componentConfig.children)) {
                    throw new Error("A view cannot have 0 children");
                }
                try {
                    // FIXME: Replace calling explicit methods with passing an array of transformer functions into the Generator.
                    const generatedContent = transformers.reduce((transformedContent, nextTransformer) => {
                        return nextTransformer.transform(appConfig)(componentConfig)(transformedContent);
                    }, template);
                    return generatedContent;
                } catch (e) {
                    throw e;
                }
            };
        }
    }
};

module.exports = Generator.bind(Generator);

function assertHasHandlerMethod(methodName) {
    return function(transformers) {
        let transformerExists = transformers.reduce((x, transformer)=>{
            return x || transformer.replaces === methodName;
        }, false);
        if (!transformerExists) {
            throw new Error(`Handler for ${methodName} is missing.`);
        }
    }
}
