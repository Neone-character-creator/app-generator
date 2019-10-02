const fs = require("fs-extra");
const path = require("path");
const templates = require("../templates");
const _ = require("lodash");

function ModelClassWriter(rootDir, modelSources) {
    const header = `const _ = require("lodash");\n`;
    const constructors = concatenateSources(modelSources.map(s => s.sources.constructor));
    const definitions = concatenateSources(modelSources.map(s => s.sources.definition));
    const values = concatenateSources(modelSources.map(s => s.sources.values));
    const exports = `module.exports = {
        ${modelSources.map(s => s.type + ":" + s.type + "Model").join(",\n\t")}
    }`;

    const concatenatedSource = _.template(templates["model"])({
        header,
        constructors,
        definitions,
        values,
        exports
    });

    const scriptsDirectory = path.resolve(rootDir, "src", "main", "resources", "scripts");
    fs.mkdirpSync(scriptsDirectory);
    fs.writeFileSync(path.resolve(scriptsDirectory, "models.js"), concatenatedSource, "utf-8");
}

function concatenateSources(sources) {
    return sources.join("\n\n") + "\n";
}

module.exports = ModelClassWriter;