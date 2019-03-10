import _ from "lodash";

export default function (appConfiguration: any) {
    return {
        ...appConfiguration, ...extractComponentDefinitions({
            views: {},
            components: {}
        }, "views", appConfiguration.views)
    };
};

function extractComponentDefinitions(components: {
    components: { [s: string]: any },
    views: { [s: string]: any }
}, componentId: string, element: any) {
    if (componentId === "views") {
        if (components.views[componentId]) {
            throw new Error(`Duplicate view found: ${componentId}`);
        }
        Object.keys(element.children).forEach(child => {
            extractViewDefinition(components, child, element.children[child]);
        })
    } else {
        if (components.components[componentId]) {
            throw new Error("Duplicate component found");
        }
        components.components[componentId] = element;
        const children = element.children;
        if (!_.isEmpty(children)) {
            Object.keys(children).forEach(child => {
                extractComponentDefinitions(components, child, children[child]);
            })
        }
    }
    if (element.children) {
        element.children = Object.keys(element.children);
    }
    components.components[componentId] = element;
    return components;
}

function extractViewDefinition(components: {
    components: { [s: string]: any },
    views: { [s: string]: any }
}, componentId: string, element: any) {
    if (components.views[componentId]) {
        throw new Error("Duplicate component found");
    }
    components.views[componentId] = element;
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