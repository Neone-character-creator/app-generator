module.exports = function (componentType) {
    if (typeof  componentType !== 'string') {
        throw new Error(`Component type must be a string, was ${typeof componentType}`);
    }
    let replaceImports = replaceAppImports;
    let replaceChildren = replaceViews;

    const template = (() => {
        switch (componentType) {
            // Fixme: Replace with configuration object.
            case "app":
                return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/app-template"), "utf-8");
            case "view":
                return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/view-template"), "utf-8");
            case "container":
                return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/container-template"), "utf-8");
            case "textfield":
                return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/textfield-template"), "utf-8");
            case "number":
                return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/number-template"), "utf-8");
            case "label":
                return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/label-template"), "utf-8");
            case "checkbox":
                return require('fs').readFileSync(require("path").resolve(__dirname, "../../code-templates/checkbox-template"), "utf-8");
            default:
                throw new Error(`component type ${componentType} not supported`);
        }
    })();

    return function (componentName) {
        if (componentType === "app" && componentName !== "app") {
            throw new Error("If type is app, name must be app as well.");
        }

        return function (appConfig) {
            if (["view", "container"].includes(componentType)) {
                replaceImports = replaceViewImports.bind(null, componentName);
                replaceChildren = defaultReplaceChildren.bind(null, componentName);
            }

            try {
                const generatedContent = [template].map(replaceName.bind(null, appConfig))
                    .map(replaceImports.bind(null, appConfig))
                    .map(replaceChildren.bind(null, appConfig))
                    .map(replaceSimpleProperties.bind(null, componentName, appConfig))
                    .map(replaceComponentName.bind(null, componentName))
                    [0];
                return generatedContent;
            } catch (e) {
                throw e;
            }
        };
    }
};

function replaceName(config, generatedContent) {
    return generatedContent.replace(/%appName%/g, config.appName);
}

function replaceViews(config, generatedContent) {
    const viewsReplacementMatcher = /^([ \t+]+)%views%/gm;
    const leadingWhitespace = (viewsReplacementMatcher.exec(generatedContent) || [null, null])[1];
    const replacementText = leadingWhitespace ? config.views.map(viewName => {
        return `${leadingWhitespace}<${camelCaseViewName(viewName)}/>`
    }).join('\n') : "";
    return generatedContent.replace(viewsReplacementMatcher, replacementText);
}

function replaceAppImports(config, generatedContent) {
    const injectedImports = config.views.map(viewName => {
        return `import ${camelCaseViewName(viewName)} from "./${camelCaseViewName(viewName)}"`
    }).join('\n');
    return generatedContent.replace(/%imports%/g, injectedImports);
}

function replaceViewImports(viewName, config, generatedContent) {
    const imports = {};
    if (!config.components[viewName].children) {
        throw new Error(`Children for view ${viewName} are missing, a view must have at least one child.`);
    }
    const injectedImports = config.components[viewName].children.map(childName => {
        const childConfig = config.components[childName];
        switch (childConfig.type) {
            case "textfield":
                if (!imports.textField) {
                    imports.textField = true;
                    return `import TextField from "@material-ui/core/TextField";`;
                }
                return undefined;
            case "container":
            case "number":
            case "label":
            case "checkbox":
                if (!imports[childName]) {
                    imports[childName] = true;
                    return `import ${pascalCaseName(childName)}${pascalCaseName(childConfig.type)} from './${pascalCaseName(childName)}${pascalCaseName(childConfig.type)}';`
                }
            default:
                throw new Error(`Import for type ${childConfig.type} not supported.`);
        }

    }).filter(_ => _).join('\n');
    return generatedContent.replace(/%imports%/g, injectedImports);
}

function defaultReplaceChildren(componentName, appConfig, generatedContent) {
    const childrenReplacementMatcher = /^([ \t+]+)%children%/gm;
    const leadingWhitespace = childrenReplacementMatcher.exec(generatedContent)[1];
    const replacementText = (appConfig.components[componentName].children || []).map(childName => {
        const childConfig = appConfig.components[childName];
        // Fixme: Replace with configuration object.
        switch (childConfig.type) {
            case "textfield": {
                let label = childConfig.label;
                if (!label) {
                    label = childName;
                }
                return `<TextField label="${label}" id="${childName}" value="" />`;
            }
            case "number": {
                let label = childConfig.label;
                if (!label) {
                    label = childName;
                }
                return `<TextField type="number" label="${label}" id="${childName}" value="" />`;
            }
            case "container":
            case "label":
            case "checkbox":
                return `<${pascalCaseName(childName)}${pascalCaseName(childConfig.type)} />`;
            default:
                throw new Error(`${childConfig.type} is not supported as a child.`);
        }
    }).join('\n');
    return generatedContent.replace(childrenReplacementMatcher, replacementText);
};

function replaceSimpleProperties(componentName, appConfig, initialContent) {
    const componentConfig = appConfig.components[componentName];
    return [initialContent].map(ic => {
        return Object.keys(appConfig.components[componentName] || {}).reduce((generatedContent, nextProperty) => {
            return generatedContent.replace(new RegExp(`%${nextProperty}%`, 'g'), componentConfig[nextProperty]);
        }, ic);
    }).map(c => {
        return Object.keys(appConfig || {}).reduce((generatedContent, nextProperty) => {
            return generatedContent.replace(new RegExp(`%${nextProperty}%`, 'g'), appConfig[nextProperty]);
        }, c);
    })[0];
}

function replaceComponentName(componentName, generatedContent) {
    return generatedContent.replace(/%componentName%/gm, componentName);
}

function camelCaseViewName(name) {
    return pascalCaseName(name) + "View";
}

function pascalCaseName(name) {
    return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
};