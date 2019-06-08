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
        schema: JSON.stringify(modelConfiguration.properties),
        values: JSON.stringify(modelConfiguration.values) || JSON.stringify([])
    });
    return source;
};