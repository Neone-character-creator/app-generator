const path = require("path");
const fs = require("fs-extra");
module.exports = function(components, tmpDirectoryRoot) {
    const componentDirectory = path.resolve(tmpDirectoryRoot, "src/main/resources/scripts");
    fs.mkdirSync(path.resolve(componentDirectory, "views"), { recursive: true});
    fs.mkdirSync(path.resolve(componentDirectory, "components"), { recursive: true});
    Object.keys(components.views).forEach(view => {
        const viewConfig = components.views[view];
        const componentPath = path.resolve(componentDirectory, viewConfig.path);

        fs.writeFileSync(componentPath, viewConfig.content, "utf-8");
    });
};