const path = require("path");
const fs = require("fs-extra");
module.exports = function (components, tmpDirectoryRoot) {
    const componentDirectory = path.resolve(tmpDirectoryRoot, "src/main/resources/scripts");
    if (fs.existsSync(path.resolve(tmpDirectoryRoot, "node_modules"))) {
        throw new Error("node_modules was detected in template directory! For performance reasons, duplicating the project template when it contains node_modules is prevented.");
    }
    fs.mkdirSync(path.resolve(componentDirectory, "views"), {recursive: true});
    fs.mkdirSync(path.resolve(componentDirectory, "components"), {recursive: true});
    return Promise.all(Object.keys([{app:components.app}]).concat(Object.keys(components.views)).concat(Object.keys(components.components)).map(component => {
        const viewConfig = components.views[component] || components.components[component] || components.app;
        const componentPath = path.resolve(componentDirectory, viewConfig.path);

        fs.writeFileSync(componentPath, viewConfig.content, "utf-8");
    }));
};