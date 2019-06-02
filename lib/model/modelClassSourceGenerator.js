const fs = require("fs-extra");
const _ = require("lodash");
const paths = require("path")

var template;
module.exports = function(modelConfiguration){
    if (!template) {
        const templateFile = fs.readFileSync(paths.resolve(__dirname, "../../code-templates/model-class-template"), "utf-8");
        template = _.template(templateFile);
    }
    const source = template({
        defaults: {},
        name: modelConfiguration.name,
        properties: {},
    });
    return source;
};