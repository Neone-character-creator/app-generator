const _ = require("lodash");
const generateComponent = require("./componentGenerators/genericGenerator");
const generateAppComponent = require("./componentGenerators/appGenerator");
const generateViewComponent = require("./componentGenerators/viewGenerator");

const babel = require("@babel/core");

const babelOptions = {
    presets: ["@babel/preset-react", "@babel/preset-env"],
};

module.exports = async function (applicationConfiguration) {
    if (_.isNil(applicationConfiguration.views) || _.isEmpty(applicationConfiguration.views)) {
        throw new Error("No views to extract");
    }

    const configurations = {
        ...applicationConfiguration.components, ...applicationConfiguration.views.reduce((transformed, view) => {
            transformed[view] = {
                type: "view"
            };
            return transformed;
        }, {}), ...{
            app: {
                type: "app"
            }
        }
    };

    const components = {};

    Object.keys(configurations).forEach(componentName => {
        const componentType = configurations[componentName].type;
        let generated;
        switch (componentType) {
            case "app":
                generated = {
                    path: `components/${componentType.substring(0, 1).toUpperCase() + componentType.substring(1)}.js`,
                    content: generateAppComponent(applicationConfiguration)
                };
                break;
            case "view":
                generated = {
                    path: `components/${componentName.substring(0, 1).toUpperCase() + componentName.substring(1)}${componentType.substring(0, 1).toUpperCase() + componentType.substring(1)}.js`,
                    content: generateViewComponent(componentName)(applicationConfiguration)
                };
                break;
            default:
                generated = {
                    path: `components/${componentName.substring(0, 1).toUpperCase() + componentName.substring(1)}${componentType.substring(0, 1).toUpperCase() + componentType.substring(1)}.js`,
                    content: generateComponent()(componentType)(componentName)(applicationConfiguration)
                }
        }
        components[componentName] = generated;
    });

    return components;
};