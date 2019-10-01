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
        const componentName = (componentConfig.name || componentIdentifier).replace(/ /g, "_");
        const componentType = componentConfig.type.replace(/ /g, "_");
        const formattedComponentIdentifier = `${_.upperFirst(componentName)}${_.upperFirst(componentType)}`;
        let generated;
        switch (componentType) {
            case "app":
                generated = {
                    path: `components/${componentType.substring(0, 1).toUpperCase() + componentType.substring(1)}.js`.replace(/ /g, "_"),
                    content: generateAppComponent(applicationConfiguration)
                };
                break;
            case "view":
                generated = {
                    path: `components/${formattedComponentIdentifier}.js`.replace(/ /g, "_"),
                    content: generateViewComponent(componentName)(applicationConfiguration)
                };
                break;
            case "select":
                generated = {
                    path: `components/${formattedComponentIdentifier}.js`.replace(/ /g, "_"),
                    content: generateSelectComponent(componentName)(applicationConfiguration)
                };
                break;
            case "container":
                generated = {
                    path: `components/${formattedComponentIdentifier}.js`.replace(/ /g, "_"),
                    content: generateContainerComponent(componentName)(applicationConfiguration)
                };
                break;
            case "list":
                generated = {
                    path: `components/${formattedComponentIdentifier}.js`.replace(/ /g, "_"),
                    content: generateListComponent(componentName)(applicationConfiguration)
                };
                break;
            default:
                generated = {
                    path: `components/${formattedComponentIdentifier}.js`.replace(/ /g, "_"),
                    content: generateComponent()(componentType)(componentName)(applicationConfiguration)
                }
        }
        hierarchy[componentIdentifier] = generated;
    });

    return hierarchy;
};