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

    if (components.components[element.name]) {
        throw new Error(`Duplicate component ${element.name} found`);
    }
    if (element.type == "view") {
        components.views.push(element.name);
    }
    components.components[element.name] = element;
    const children: Array<any> = element.children;
    if (!_.isEmpty(children)) {
        children.forEach(child => {
            extractComponentDefinitions(components, child);
        });
        element.children = element.children.map((child: any) => {
            return child.name;
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
    if (!_.isEmpty(children)) {
        children.forEach((child: any) => {
            extractComponentDefinitions(components, child);
        })
    }
    if (element.children) {
        element.children = element.children.map((child: any) => {
            return child.name;
        })
    }
    components.components[element.name] = element;
    return components;
}