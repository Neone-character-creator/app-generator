import _ from "lodash";

export default function (appConfiguration: any) {
    return {
        ...appConfiguration, ...extractComponentDefinitions({
            views: [],
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
        element.children.forEach((child:any)=> {
            extractViewDefinition(components, child.name, child);
        })
    } else {
        if (components.components[componentId]) {
            throw new Error(`Duplicate component ${componentId} found`);
        }
        components.components[componentId] = element;
        const children : Array<any> = element.children;
        if (!_.isEmpty(children)) {
            children.forEach(child => {
                extractComponentDefinitions(components, child.name, child);
            })
        }
        components.components[componentId] = element;
    }
    if (element.children) {
        element.children = element.children.map((child:any) => {
            return child.name;
        });
    }
    return components;
}

function extractViewDefinition(components: {
    components: { [s: string]: any },
    views: { [s: string]: any }
}, componentId: string, element: any) {
    if (components.views[element.name]) {
        throw new Error(`Duplicate component ${element.name} found`);
    }
    const children = element.children;
    if (!_.isEmpty(children)) {
        children.forEach((child:any) => {
            extractComponentDefinitions(components, child.name, child);
        })
    }
    if (element.children) {
        element.children = element.children.map((child:any) => {
            return child.name;
        })
    }
    components.views.push(element.name);
    components.components[element.name] = element;

    return components;
}