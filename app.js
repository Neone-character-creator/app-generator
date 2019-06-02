const argv = require('yargs').argv;
const fs = require('fs-extra');
const _ = require("lodash");
const PluginGenerator = require("./lib/pluginGenerator");
const ModelClassGenerator = require("./lib/classGenerator");
const ModelClassWriter = require("./lib/model/writer");
const tmp = require("tmp");
const configTransformer = require("./lib/model/transformers/app");

if (!argv.configFile) {
    throw new Error("--configFile is missing.");
}
try {
    const rawConfiguraiton = require("./lib/schema/configuration")(JSON.parse(fs.readFileSync(argv.configFile, 'utf-8')));
    const componentConfiguration = Object.assign(rawConfiguraiton, require('./lib/generateComponentsHierarchy').default(rawConfiguraiton));
    const modelConfiguration = _.pick(rawConfiguraiton, "model");
    const appConfiguration = configTransformer(Object.assign({}, componentConfiguration, modelConfiguration));

    const tmpDir = tmp.dirSync().name;
    if(argv.only === "classes") {
        const modelSources = new ModelClassGenerator(appConfiguration.model, tmpDir).generate();
        ModelClassWriter(tmpDir, modelSources);
        return;
    }

    var pluginGenerator = new PluginGenerator(appConfiguration, tmpDir);
    pluginGenerator.generate().catch(e => console.error(e));
} catch (e) {
    if (e.errors) {
        e.errors.forEach(error => {
            console.error(error);
        })
    } else {
        console.error(e);
    }
}