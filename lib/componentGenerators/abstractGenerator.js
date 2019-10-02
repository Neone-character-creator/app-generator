const _ = require("lodash");

const templates = require("../templates");

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
    direction: "vertical",
    readOnly: false,
    children: [],
    value: null,
    connectionImports: "",
    label: "",
    values: null
};

function Generator(transformers) {
    if (_.isNil(transformers)) {
        throw new Error("Functionality object is undefined or null");
    }
    assertHasHandlerMethod("imports")(transformers);
    assertHasHandlerMethod("children")(transformers);
    return function (componentType) {
        if (typeof componentType !== 'string') {
            throw new Error(`Component type must be a string, was ${typeof componentType}`);
        }

        return function (componentName) {
            if (componentType === "app" && componentName !== "app") {
                throw new Error("If type is app, componentName must be app as well.");
            }

            return function (appConfig, overrideComponentConfig) {
                const componentIdentifier = `${componentName}${componentType}`;
                const initialComponentConfig = appConfig.components[componentIdentifier];
                if (!initialComponentConfig) {
                    throw new Error(`No config for ${componentIdentifier} found`);
                }

                const componentConfig = {
                    ...initialComponentConfig, ...{
                        componentIdentifier: componentName,
                        // FIXME: Extract these property names that make a component connected into a constant.
                        _connectedComponent: (initialComponentConfig.bind ||
                            initialComponentConfig.value ||
                            initialComponentConfig.action ||
                            initialComponentConfig.text),
                        gameName: appConfig.gameName,
                        componentName: componentName,
                        readOnly: initialComponentConfig.value !== undefined
                    }, ...overrideComponentConfig
                };

                const header = templates.import;
                const body = templates[componentType];
                const footer = templates.connection;

                const template = header + "\n" +
                    body + "\n" +
                    footer;

                transformers.forEach(transformer => {
                    if (transformer.required && _.isNil(_.get(componentConfig, transformer.required.propertyPath))) {
                        throw new Error(`The property ${transformer.required.propertyPath} is required, but was not found in the component configuration: ${JSON.stringify(componentConfig)}`)
                    }
                });

                if (componentConfig.type !== componentType) {
                    throw new Error(`The component configuration type of ${componentConfig.type} and the generator configuration type of ${componentType} are different for components ${componentName}.`);
                }

                if (componentType === "view" && _.isEmpty(componentConfig.children)) {
                    throw new Error("A view cannot have 0 children");
                }
                try {
                    const replacements = transformers.reduce((currentReplacements, nextTransformer) => {
                        return nextTransformer.transform(appConfig)(componentConfig)(currentReplacements);
                    }, {});
                    const replacers = {
                        ...defaultReplacers, ...replacements
                    };
                    try {
                        return _.template(template, {
                            evaluate: null
                        })(replacers);
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
    return function (transformers) {
        let transformerExists = transformers.reduce((x, transformer) => {
            return x || transformer.replaces === methodName;
        }, false);
        if (!transformerExists) {
            throw new Error(`Handler for ${methodName} is missing.`);
        }
    }
}
