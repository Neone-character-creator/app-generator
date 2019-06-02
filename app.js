const argv = require('yargs').argv;
const fs = require('fs-extra');
const _ = require("lodash");
const PluginGenerator = require("./lib/pluginGenerator");
const ModelClassGenerator = require("./lib/classGenerator");
const tmp = require("tmp");

if (!argv.configFile) {
    throw new Error("--configFile is missing.");
}
try {
    const rawConfiguraiton = require("./lib/schema/configuration")(JSON.parse(fs.readFileSync(argv.configFile, 'utf-8')));
    const componentConfiguration = Object.assign(rawConfiguraiton, require('./lib/generateComponentsHierarchy').default(rawConfiguraiton));
    const modelConfiguration = _.pick(rawConfiguraiton, "model");
    const appConfiguration = Object.assign({}, componentConfiguration, modelConfiguration);

    const tmpDir = tmp.dirSync();
    if(argv.only === "classes") {
        new ModelClassGenerator(appConfiguration.model, tmpDir).generate();
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