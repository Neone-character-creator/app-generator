const _ = require("lodash");
module.exports = function (appConfiguration) {
    return {...appConfiguration, ...extractComponentDefinitions({}, "views", appConfiguration.views)};
};

function extractComponentDefinitions(components, componentId, element) {
    if (components[componentId]) {
        throw new Error("Duplicate component found");
    }
    components[componentId] = element;
    const children = element.children;
    if (!_.isEmpty(children)) {
        Object.keys(children).forEach(child => {
            extractComponentDefinitions(components, child, children[child]);
        })
    }
    if (element.children) {
        element.children = Object.keys(element.children);

    }
    return components;
}