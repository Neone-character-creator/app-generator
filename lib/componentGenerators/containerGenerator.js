const pascalCaseName = require("../pascalCaneName");
const genericGenerator = require("./genericGenerator");

function ContainerGenerator() {
    return genericGenerator(ContainerGenerator.defaultFunctionality);
}

function calculateChildSize(child, totalChildCount){
    if (child.weight) {
        return child.weight;
    } else {
        switch (totalChildCount) {
            case 1:
                return 12;
            case 2:
                return 6;
            case 3:
            case 5:
                return 4;
            case 6:
                return 2;
            default:
                return 3;
        }
    }
}

ContainerGenerator.defaultFunctionality = [
    {
        replaces: "children",
        transform: function (appConfig) {
            return function (componentConfig) {
                const childComponents = componentConfig.children.map(cn => appConfig.components[cn]);
                const childSizes = componentConfig.direction === "horizontal" ?
                    childComponents.map(c => calculateChildSize(c, componentConfig.children.length)) :
                    componentConfig.children.map(c => 12);
                return function (transformers) {
                    // const leadingWhitespace = childrenReplacementMatcher.exec(generatedContent)[1];
                    const replacementText = (componentConfig.children || []).map((childName, index) => {
                        const childConfig = appConfig.components[childName];
                        const itemSize = childSizes[index];
                        return `<Grid item xs={${itemSize}}>` + "\n" +
                            `<${pascalCaseName(childName)}${pascalCaseName(childConfig.type)} value={this.props.value} />` + "\n" +
                            "</Grid>"
                            ;
                    }).join('\n');
                    return {...transformers,
                        children: replacementText
                    }
                }
            }
        }
    },
];

module.exports = ContainerGenerator()("container");