import _ from "lodash";

export default function (appConfiguration: any) {
    return {
        ...extractComponentDefinitions({
            components: {}
        }, "app", appConfiguration.views)
    };
};

function extractComponentDefinitions(components: {
    components: { [s: string]: any }
}, componentId: string, element: any) {
    if (componentId === "app") {
        element.type = "app";
    }
    if (componentId === "view") {
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
        components.components[componentId] = element;
    }
    if (element.children) {
        element.children = Object.keys(element.children);
    }
    return components;
}

function extractViewDefinition(components: {
    components: { [s: string]: any }
}, componentId: string, element: any) {
    const children = element.children;
    if (!_.isEmpty(children)) {
        Object.keys(children).forEach(child => {
            extractComponentDefinitions(components, child, children[child]);
        })
    }
    if (element.children) {
        element.children = Object.keys(element.children);
    }
    components.components[componentId] = element;
    return components;
}