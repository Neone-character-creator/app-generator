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
                    const replacementText = (componentConfig.children || []).map((childIdentifier, index) => {
                        const childConfig = appConfig.components[childIdentifier];
                        const name = childConfig.name;
                        const type = childConfig.type;
                        const itemSize = childSizes[index];
                        return `<Grid item xs={${itemSize}}>` + "\n" +
                            `<${pascalCaseName(name)}${pascalCaseName(type)} value={this.props.value} index={this.props.index} parent={this.props}/>` + "\n" +
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
    {
        replaces: 'border',
        transform: function() {
            return function(componentConfig) {
                return function(transformers){
                    const borderString = componentConfig.border !== undefined ?
                    '"2px solid black"' : 0;
                    return {...transformers, border: borderString};
                }
            }
        }
    },
    {
        replaces: "value",
        transform: function(){
            return function(){
                return function(transformers) {
                    return {...transformers, valueExpression: `"#$this"`}
                }
            }
        }
    }
];

module.exports = ContainerGenerator()("container");