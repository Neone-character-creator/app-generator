const path = require("path");
const fs = require("fs-extra");
module.exports = function (components, tmpDirectoryRoot) {
    const componentDirectory = path.resolve(tmpDirectoryRoot, "src/main/resources/scripts");
    if (fs.existsSync(path.resolve(tmpDirectoryRoot, "node_modules"))) {
        throw new Error("node_modules was detected in template directory! For performance reasons, duplicating the project template when it contains node_modules is prevented.");
    }
    fs.mkdirSync(path.resolve(componentDirectory, "views"), {recursive: true});
    fs.mkdirSync(path.resolve(componentDirectory, "components"), {recursive: true});
    return Object.keys(components).map(component => {
        const componentConfig = components[component];
        const componentPath = path.resolve(componentDirectory, componentConfig.path);

        fs.writeFileSync(componentPath, componentConfig.content, "utf-8");
    });
};