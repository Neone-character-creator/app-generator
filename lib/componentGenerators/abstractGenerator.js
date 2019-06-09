const _ = require("lodash");
const pascalCaseName = require("../pascalCaneName");
const path = require("path");
const fs = require("fs-extra");

const templates = (()=>{
    return fs.readdirSync(path.resolve(__dirname, "..", "..", "code-templates")).reduce((mapped, file)=>{
        mapped[file.substring(0, file.indexOf("-template"))] = fs.readFileSync(require("path").resolve(__dirname, "..", "..", "code-templates", file), "utf-8");
        return mapped;
    }, {});
})();

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

        const template = templates[componentType];
        if (!template) {
            throw new Error(`component type ${componentType} not supported`);
        }

        return function (componentName) {
            if (componentType === "app" && componentName !== "app") {
                throw new Error("If type is app, componentName must be app as well.");
            }

            return function (appConfig) {

                const componentConfig = {...appConfig.components[componentName], ...{
                    appName: appConfig.appName,
                    componentName: componentName
                }};

                transformers.forEach(transformer => {
                    if (transformer.required && _.isNil(_.get(componentConfig, transformer.required.propertyPath))) {
                        throw new Error(`The property ${transformer.required.propertyPath} is required, but was not found in the component configuration: ${JSON.stringify(componentConfig)}`)
                    }
                })

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
