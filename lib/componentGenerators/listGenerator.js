const genericGenerator = require("./genericGenerator");
const pascalCaseName = require("../pascalCaneName");

function ListGenerator() {
    return genericGenerator(ListGenerator.defaultFunctionality);
}

ListGenerator.defaultFunctionality = [
    {
        replaces: "childComponent",
        transform:  function (appConfig) {
            return function (componentConfig) {
                try {
                    const childComponentName = pascalCaseName(componentConfig.items.child.name)
                        + pascalCaseName(componentConfig.items.child.type);
                    return function (replacers) {
                        const keyPropertyString = componentConfig.keyProperty ?
                        `${componentConfig.keyProperty}` : "id";
                        return {
                            ...replacers,
                            keyProperty : keyPropertyString,
                            childComponent: `<${childComponentName} index={props.index} value={props.value} />`, // FIXME: Move this into a template file
                            imports: replacers.imports + "\n" + `import ${childComponentName} from "./${childComponentName}";`
                        };
                    }
                } catch (e) {
                    console.error(`Error with component ${componentConfig.name}`);
                    throw e;
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