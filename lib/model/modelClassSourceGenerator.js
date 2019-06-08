const fs = require("fs-extra");
const _ = require("lodash");
const paths = require("path")

var template;
module.exports = function(name, modelConfiguration){
    if (!template) {
        const templateFile = fs.readFileSync(paths.resolve(__dirname, "../../code-templates/model-class-template"), "utf-8");
        template = _.template(templateFile);
    }
    const source = template({
        name: name,
        properties: Object.keys(modelConfiguration.properties).map(propName => {
            const propDef = modelConfiguration.properties[propName];
            const defaultValue = determineDefaultValue(propDef);
            return `this.${propName} = ${defaultValue};`;
        }).join("\n\t"),
        values: JSON.stringify(modelConfiguration.values) || JSON.stringify([])
    });
    return source;
};

function determineDefaultValue(propDef) {
    if (propDef.type === "string") {
        return `"${propDef.default}"`;
    }
    if(propDef.type === "number") {
        return 0;
    }
    if (!propDef.default) {
        if (propDef.type.match(/\[.+\]/)){
            return "[]"
        } else {
            return `new ${propDef.type}Model()`;
        }
    }
    return propDef.default;
    propDef.default ? propDef.default :
        `new ${propDef.type}()`
}