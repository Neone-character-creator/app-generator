"use strict";
const pascalCaseName = require("../pascalCaneName");
const GenericGenerator = require("./genericGenerator");
/**
 * Specialized generator for generating App components.
 */
module.exports = GenericGenerator(
    [
        {
            replaces: "imports",
            transform: function (appConfig) {
                return function () {
                    return function (replacers) {
                        const injectedImports = appConfig.views.map(viewIdentifier => {
                            const viewConfig = appConfig.components[viewIdentifier];
                            const viewName = `${pascalCaseName(viewConfig.name)}View`.replace(/ /g, "_");
                            return `import ${viewName}  from "./${viewName}"`
                        }).concat([
                        `import { Tab, Tabs, TabList, TabPanel } from "react-tabs";`,
                        `import 'react-tabs/style/react-tabs.css';`
                        ]).join('\n');
                        return {
                            ...replacers,
                            imports: injectedImports
                        };
                    }
                }
            }
        },
        {
            replaces: "children",
            transform: function (appConfig) {
                return function () {
                    return function (replacers) {
                        const replacementText = appConfig.views.map(viewIdentifier => {
                            const viewConfig = appConfig.components[viewIdentifier];
                            const viewName = `${pascalCaseName(viewConfig.name)}View`.replace(/ /g, "_");
                            return `<TabPanel>` + "\n" +
                            `<${viewName}/>` + "\n" +
                            `</TabPanel>`
                            ;
                        }).join('\n');
                        return {
                            ...replacers,
                            children: replacementText
                        };
                    }
                }
            }
        },
        {
            replaces: "viewNames",
            transform: function (appConfig) {
                return function () {
                    return function (replacers) {
                        return {
                            ...replacers,
                            viewNames: appConfig.views.map(view => {
                                const componentName = appConfig.components[view].name;
                                return `<Tab>` + "\n" +
                                    `${pascalCaseName(componentName)}` + "\n" +
                                    "</Tab>"
                            }).join("\n")
                        };
                    }
                }
            }
        }
    ]
)("app")("app");