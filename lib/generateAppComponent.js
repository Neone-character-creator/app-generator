const template = require('fs').readFileSync(require("path").resolve(__dirname, "../code-templates/app-template.jsx"), "utf-8");
module.exports = function(appConfig) {
    const generatedContent = template.replace(/%name%/g, appConfig.name);
    return generatedContent;
};