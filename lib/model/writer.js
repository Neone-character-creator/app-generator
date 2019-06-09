const fs = require("fs-extra");
const path = require("path");
function ModelClassWriter(rootDir, modelSources) {
    const concatenatedSource = `const _ = require("lodash");\n` +
        modelSources.map(s => s.source).join("\n\n") + "\n" +
    `
module.exports = {
    ${modelSources.map(s => s.type + ":" + s.type + "Model").join(",\n\t")}
}
    `;
    const scriptsDirectory = path.resolve(rootDir, "src", "main", "resources", "scripts");
    fs.mkdirpSync(scriptsDirectory);
    fs.writeFileSync(path.resolve(scriptsDirectory, "models.js"), concatenatedSource, "utf-8");
}

module.exports = ModelClassWriter;