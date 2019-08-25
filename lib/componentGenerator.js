const _ = require("lodash");

const generateComponent = require("./componentGenerators/genericGenerator");
const generateAppComponent = require("./componentGenerators/appGenerator");
const generateViewComponent = require("./componentGenerators/viewGenerator");
const generateSelectComponent = require("./componentGenerators/selectGenerator");
const generateContainerComponent = require("./componentGenerators/containerGenerator");
const generateListComponent = require("./componentGenerators/listGenerator");

module.exports = function (applicationConfiguration) {
    if (_.isNil(applicationConfiguration.views) || _.isEmpty(applicationConfiguration.views)) {
        throw new Error("No views to extract");
    }

    const hierarchy = {};

    Object.keys(applicationConfiguration.components).forEach(componentIdentifier => {
        const componentConfig = applicationConfiguration.components[componentIdentifier];
        const componentName = componentConfig.name;
        const componentType = componentConfig.type;
        const formattedComponentIdentifier = componentName.substring(0,1).toUpperCase() +
            componentName.substring(1) + componentType.substring(0, 1).toUpperCase() + componentType.substring(1);
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
                    path: `components/${formattedComponentIdentifier}.js`,
                    content: generateViewComponent(componentName)(applicationConfiguration)
                };
                break;
            case "select":
                generated = {
                    path: `components/${formattedComponentIdentifier}.js`,
                    content: generateSelectComponent(componentName)(applicationConfiguration)
                };
                break;
            case "container":
                generated = {
                    path: `components/${formattedComponentIdentifier}.js`,
                    content: generateContainerComponent(componentName)(applicationConfiguration)
                };
                break;
            case "list":
                generated = {
                    path: `components/${formattedComponentIdentifier}.js`,
                    content: generateListComponent(componentName)(applicationConfiguration)
                };
                break;
            default:
                generated = {
                    path: `components/${formattedComponentIdentifier}.js`,
                    content: generateComponent()(componentType)(componentName)(applicationConfiguration)
                }
        }
        hierarchy[componentIdentifier] = generated;
    });

    return hierarchy;
};