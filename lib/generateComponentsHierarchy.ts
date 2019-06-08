import _ from "lodash";

export default function (appConfiguration: any) {
    return {
        ...extractComponentDefinitions({
            components: {},
            views: []
        }, "app", appConfiguration.views)
    };
};

function extractComponentDefinitions(components: {
    components: { [s: string]: any },
    views: string[]
}, componentId: string, element: any) {

    if (components.components[componentId]) {
        throw new Error(`Duplicate component ${componentId} found`);
    }
    if (element.type == "view") {
        components.views.push(componentId);
    }
    components.components[componentId] = element;
    const children: Array<any> = element.children;
    if (!_.isEmpty(children)) {
        children.forEach(child => {
            extractComponentDefinitions(components, child.name, child);
        })
    }
    components.components[componentId] = element;
    if (element.children) {
        element.children = element.children.map((child: any) => {
            return child.name;
        });
    }
    return components;
}

function extractViewDefinition(components: {
    components: { [s: string]: any },
    views: string[]
}, componentId: string, element: any) {
    const children = element.children;
    if (!_.isEmpty(children)) {
        children.forEach((child: any) => {
            extractComponentDefinitions(components, child.name, child);
        })
    }
    if (element.children) {
        element.children = element.children.map((child: any) => {
            return child.name;
        })
    }
    components.components[componentId] = element;
    return components;
}