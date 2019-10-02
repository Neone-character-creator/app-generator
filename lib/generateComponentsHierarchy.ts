import _ from "lodash";

export default function (rootComponent: any) {
    return {
        ...extractComponentDefinitions({
            components: {},
            views: []
        }, rootComponent)
    };
};

function extractComponentDefinitions(components: {
    components: { [s: string]: any },
    views: string[]
}, element: any) {
    element.identifier = `${element.name}${element.type}`;
    if (components.components[element.identifier]) {
        throw new Error(`Duplicate component ${element.name} ${element.type} found`);
    }
    if (element.type == "view") {
        components.views.push(element.identifier);
    }
    components.components[element.identifier] = element;
    const children: Array<any> = element.children;
    if (!_.isEmpty(children)) {
        children.forEach(child => {
            extractComponentDefinitions(components, child);
        });
        element.children = element.children.map((child: any) => {
            return child.identifier;
        });
    }
    const listChild = _.get(element, "items.child");
    if (!_.isNil(listChild)) {
        extractComponentDefinitions(components, listChild);
    }
    return components;
}

function extractViewDefinition(components: {
    components: { [s: string]: any },
    views: string[]
}, element: any) {
    const children = element.children;
    if(!element.identifier) {
        throw new Error(`Component ${element.name} has no identifier`);
    }
    if (!_.isEmpty(children)) {
        children.forEach((child: any) => {
            extractComponentDefinitions(components, child);
        })
    }
    if (element.children) {
        element.children = element.children.map((child: any) => {
            return child.identifier;
        })
    }
    components.components[element.identifier] = element;
    return components;
}