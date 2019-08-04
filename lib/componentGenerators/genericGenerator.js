const pascalCaseName = require("../pascalCaneName");
const abstractGenerator = require("./abstractGenerator");
const templates = require("../templates");

function GenericGenerator(overrideTransformers) {
    overrideTransformers = overrideTransformers || [];
    return abstractGenerator([...GenericGenerator.defaultFunctionality, ...overrideTransformers].map(defaultTransformer => {
        const overrideTransformer = overrideTransformers.find(ot => {
            return ot.replaces === defaultTransformer.replaces;
        });
        return overrideTransformer || defaultTransformer;
    }));
}

GenericGenerator.defaultFunctionality = [
    {
        replaces: "imports",
        transform: function (appConfig) {
            return function (componentConfig) {
                return function (replacers) {
                    const imports = {
                        checkbox: `import Checkbox from "@material-ui/core/Checkbox";`,
                        textfield: `import Textfield from "@material-ui/core/TextField";`,
                        formControl: `import FormControl from "@material-ui/core/FormControl";`,
                        inputLabel: `import InputLabel from "@material-ui/core/InputLabel";`,
                        select: `import Select from "@material-ui/core/Select";`,
                        menuItem: `import MenuItem from "@material-ui/core/MenuItem";`,
                        list: `import List from "@material-ui/core/List";`,
                        listItem: `import ListItem from "@material-ui/core/ListItem";`,
                        grid: `import Grid from "@material-ui/core/Grid";`,
                        button: `import Button from "@material-ui/core/Button";`
                    };
                    (componentConfig.children || []).forEach(childName => {
                        const childConfig = appConfig.components[childName];
                        switch (childConfig.type) {
                            case "button":
                            case "textfield":
                            case "number":
                            case "container":
                            case "label":
                            case "checkbox":
                            case "select":
                            case "list":
                                if (!imports[childName]) {
                                    imports[childName] = `import ${pascalCaseName(childName)}${pascalCaseName(childConfig.type)} from './${pascalCaseName(childName)}${pascalCaseName(childConfig.type)}';`
                                }
                                break;
                            default:
                                throw new Error(`Import for type ${childConfig.type} not supported`);
                        }

                    });
                    const generatedImports = Object.getOwnPropertyNames(imports).map(i => imports[i]).join("\n");
                    return {
                        ...replacers,
                        imports: replacers.imports ? replacers.imports + generatedImports : generatedImports
                    };
                }
            }
        }
    },
    {
        replaces: "children",
        transform: function (appConfig) {
            return function (componentConfig) {
                return function (replacers) {
                    return {
                        ...replacers,
                        children: (componentConfig.children || []).map(childName => {
                            const childConfig = appConfig.components[childName];
                            // Fixme: Replace with configuration object.
                            return `<${pascalCaseName(childName)}${pascalCaseName(childConfig.type)} />`;
                        }).join('\n')
                    };
                }
            }
        }
    },
    {
        replaces: "readOnly",
        transform: function (appConfig) {
            return function (componentConfig) {
                return function (replacers) {
                    const readOnly = componentConfig.readOnly || componentConfig.type !== "button"
                    return componentConfig.readOnly !== undefined && !replacers.readOnly ? {
                        ...replacers,
                        readOnly
                    } : replacers;
                }
            }
        }
    },
    {
        replaces: "bind",
        transform: function (appConfig) {
            return function (componentConfig) {
                return function (replacers) {

                    const bindingExpression = componentConfig.bind || componentConfig.value || componentConfig.text;
                    return {
                        ...replacers,
                        boundProperty: bindingExpression ? `"${bindingExpression}"` : "undefined",
                        isBoundComponent: componentConfig.bind !== undefined,
                        readOnly: componentConfig.bind ? false : replacers.readOnly
                    };
                }
            }
        }
    },
    {
        replaces: "value",
        transform: function (appConfig) {
            return function (componentConfig) {
                return function (replacers) {
                    return componentConfig.value ? {
                        ...replacers,
                        value: `"${componentConfig.value}"`
                    } : replacers;
                }
            }
        }
    },
    {
        replaces: "connectionImports",
        transform: function (appConfig) {
            return function (componentConfig) {
                return function (replacers) {
                    if (componentConfig._connectedComponent) {
                        return {
                            ...replacers,
                            connectionImports: `import { connect } from "react-redux";`
                        };
                    }
                    return replacers;
                }
            }
        }
    },
    {
        replaces: "action",
        transform: function (appConfig) {
            return function (componentConfig) {
                return function (replacers) {
                    return {
                        ...replacers,
                        action: `"${componentConfig.action}"` || undefined
                    }
                }
            }
        }
    },
    {
        replaces: "disabledWhen",
        transform: function () {
            return function (componentConfig) {
                return function (replacers) {
                    return {
                        ...replacers,
                        disabledWhen: `"${componentConfig.disabledWhen}"` || undefined
                    }
                }
            }
        }
    },
    {
        replaces: "selectionCount",
        transform: function(){
            return function(){
                return function (replacers) {
                    return {
                        ...replacers,
                        selectionCount: 0
                    }
                }
            }
        }
    },
    {
        transform: function (appConfig) {
            return function (componentConfig) {
                return function (replacers) {
                    Object.getOwnPropertyNames(componentConfig).map(nextProperty => {
                        if (replacers[nextProperty] === undefined) {
                            replacers[nextProperty] = componentConfig[nextProperty]
                        }
                    });
                    return replacers;
                }
            }
        }
    }
];

module.exports = GenericGenerator;