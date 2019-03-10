module.exports = function (componentType) {
    if (typeof  componentType !== 'string') {
        throw new Error("Component type must be a string");
    }
    let replaceImports = replaceAppImports;
    let replaceChildren = replaceViews;

    const template = (() => {
        switch (componentType) {
            case "app":
                return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/app-template"), "utf-8");
            case "view":
                return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/view-template"), "utf-8");
            default:
                throw new Error(`component type ${componentType} not supported`);
        }
    })();

    return function (componentName) {
        if (componentType === "app" && componentName !== "app") {
            throw new Error("If type is app, name must be app as well.");
        }

        if (componentType === "view") {
            replaceImports = replaceViewImports.bind(null, componentName);
            replaceChildren = defaultReplaceChildren.bind(null, componentName);
        }

        return function (appConfig) {
            try {
                const generatedContent = [template].map(replaceName.bind(null, appConfig))
                    .map(replaceImports.bind(null, appConfig))
                    .map(replaceChildren.bind(null, appConfig))
                    .map(replaceComponentName.bind(null, componentName))
                    [0];
                return generatedContent;
            } catch (e) {
                throw e;
            }
        };
    }
}

function replaceName(config, generatedContent) {
    return generatedContent.replace(/%appName%/g, config.appName);
}

function replaceViews(config, generatedContent) {
    const viewsReplacementMatcher = /^([ \t+]+)%views%/gm;
    const leadingWhitespace = viewsReplacementMatcher.exec(generatedContent)[1];
    const replacementText = Object.keys(config.views).map(viewName => {
        return `${leadingWhitespace}<${camelCaseViewName(viewName)}>`
    }).join('\n');
    return generatedContent.replace(viewsReplacementMatcher, replacementText);
}

function replaceAppImports(config, generatedContent) {
    const injectedImports = Object.keys(config.views).map(viewName => {
        return `import * as ${camelCaseViewName(viewName)} from "../views/${camelCaseViewName(viewName)}"`
    }).join('\n');
    return generatedContent.replace(/%imports%/g, injectedImports);
}

function replaceViewImports(viewName, config, generatedContent) {
    let textFieldImported = false;
    if (!config.views[viewName].children) {
        throw new Error(`Children for view ${viewName} are missing, a view must have at least one child.`);
    }
    const injectedImports = config.views[viewName].children.map(childName => {
        const childConfig = config.components[childName];
        switch (childConfig.type) {
            case "textfield":
                if (!textFieldImported) {
                    textFieldImported = true;
                    return `import TextField from "@material-ui/core/TextField";`;
                }
                return undefined;
        }

    }).filter(_ => _).join('\n');
    return generatedContent.replace(/%imports%/g, injectedImports);
}

function defaultReplaceChildren(componentName, config, generatedContent) {
    const childrenReplacementMatcher = /^([ \t+]+)%children%/gm;
    const leadingWhitespace = childrenReplacementMatcher.exec(generatedContent)[1];
    const replacementText = config.views[componentName].children.map(childName => {
        const childConfig = config.components[childName];
        switch (childConfig.type) {
            case "textfield":
                return `<TextField id="${childName}" value="" />`;
            default:
                throw new Error(`${childConfig.type} is invalid`);
        }
    }).join('\n');
    return generatedContent.replace(childrenReplacementMatcher, replacementText);
};

function replaceComponentName(componentName, generatedContent) {
    return generatedContent.replace(/%componentName%/gm, componentName);
}

function camelCaseViewName(name) {
    return camelCaseName(name) + "View";
}

function camelCaseName(name) {
    return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
};