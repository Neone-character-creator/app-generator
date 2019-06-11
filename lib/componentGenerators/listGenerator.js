const genericGenerator = require("./genericGenerator");
const componentHierarchyGenerator = require("../generateComponentsHierarchy").default;
const pascalCaseName = require("../pascalCaneName");

function ListGenerator() {
    return genericGenerator(ListGenerator.defaultFunctionality);
}

ListGenerator.defaultFunctionality = [
    {
        replaces: "childComponent",
        transform:  function (appConfig) {
            return function (componentConfig) {
                const childComponentName = pascalCaseName(componentConfig.items.child.name)
                    + pascalCaseName(componentConfig.items.child.type);
                const childComponentImports = appConfig.components[componentConfig.items.child.name].children.map(c => {
                    const component = appConfig.components[c];
                    return pascalCaseName(component.name) + pascalCaseName(component.type)
                });
                return function (replacers) {
                    return {
                        ...replacers,
                        childComponent: `<${childComponentName} value={props.value} />`,
                        imports: replacers.imports + "\n" + `import ${childComponentName} from "./${childComponentName}";`
                            // .map(child => `import ${child} from "./${child}";`)
                            // .join("\n")
                    };
                }
            }
        }
    },
/*    {
        replaces: "listImports",
        transform:  function (appConfig) {
            return function (componentConfig) {
                return function (replacers) {
                    return {...replacers,
                        imports: replacers.imports += "\n" +
                            [`import List from "@material-ui/core/List"`, `import ListItem from "@material-ui/core/ListItem"`].join("\n")
                    };
                }
            }
        }
    } */
];

module.exports = ListGenerator(ListGenerator.defaultFunctionality)("list");