const _ = require("lodash");
const pascalCaseName = require("../pascalCaneName");
const path = require("path");
const fs = require("fs-extra");

const templates = require("../componentTemplates");

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

const defaultReplacers = {
    boundProperty: null,
    readOnly: false,
    children: [],
    value: null,
    connectionImports: "",
    label:"",
    values: null
};

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

        return function (componentName) {
            if (componentType === "app" && componentName !== "app") {
                throw new Error("If type is app, componentName must be app as well.");
            }

            return function (appConfig, overrideComponentConfig) {

                const componentConfig = {...appConfig.components[componentName], ...{
                    appName: appConfig.appName,
                    componentName: componentName
                }, ...overrideComponentConfig};

                const header = templates.import;
                const body = templates[componentType];
                const footer = componentConfig.bind || componentConfig.value ? templates.connection : templates.export;

                const template = header + "\n" +
                    body + "\n" +
                    footer;

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
                    const replacers = {...defaultReplacers, ...transformers.reduce((currentReplacements, nextTransformer) => {
                        return nextTransformer.transform(appConfig)(componentConfig)(currentReplacements);
                    }, {})};
                    try {
                        return _.template(template)(replacers);
                    } catch (e) {
                        console.error(`There was an error generating component ${componentConfig.componentName}`);
                        throw e;
                    }
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
