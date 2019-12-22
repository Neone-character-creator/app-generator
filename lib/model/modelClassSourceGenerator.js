const fs = require("fs-extra");
const _ = require("lodash");
const paths = require("path")

var constructorTemplate;
var valuesTemplate;
var definitionTemplate;
module.exports = function(name, modelConfiguration){
    if (!constructorTemplate) {
        const constructorTemplateFile = fs.readFileSync(paths.resolve(__dirname, "../../code-templates/model-constructor-template"), "utf-8");
        constructorTemplate = _.template(constructorTemplateFile);
    }
    if (!valuesTemplate) {
        const valuesTemplateFile = fs.readFileSync(paths.resolve(__dirname, "../../code-templates/model-values-template"), "utf-8");
        valuesTemplate = _.template(valuesTemplateFile);
    }
    if (!definitionTemplate) {
        const definitionTemplateFile = fs.readFileSync(paths.resolve(__dirname, "../../code-templates/model-definition-template"), "utf-8");
        definitionTemplate = _.template(definitionTemplateFile);
    }

    return {
        constructor: constructorTemplate({
            name
        }),
        values: valuesTemplate({
            name,
            values: JSON.stringify(modelConfiguration.values) || JSON.stringify([])
        }),
        definition: definitionTemplate({
            name,
            schema: JSON.stringify(modelConfiguration.properties),
            effects: JSON.stringify(modelConfiguration.effects || [])
        })
    };
};