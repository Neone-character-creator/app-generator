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
                        const injectedImports = appConfig.views.map(viewName => {
                            return `import ${pascalCaseName(viewName)}View from "./${pascalCaseName(viewName)}View"`
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
                        const replacementText = appConfig.views.map(viewName => {
                            return `<TabPanel>` + "\n" +
                            `<${pascalCaseName(viewName)}View/>` + "\n" +
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
                                return `<Tab>` + "\n" +
                                    `${pascalCaseName(view)}` + "\n" +
                                    "</Tab>"
                            }).join("\n")
                        };
                    }
                }
            }
        }
    ]
)("app")("app");