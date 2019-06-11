const argv = require('yargs').argv;
const fs = require('fs-extra');
const _ = require("lodash");
const PluginGenerator = require("./lib/pluginGenerator");
const ModelClassGenerator = require("./lib/classGenerator");
const ModelClassWriter = require("./lib/model/writer");
const tmp = require("tmp");

if (!argv.configFile) {
    throw new Error("--configFile is missing.");
}
try {
    const rawConfiguraiton = require("./lib/schema/configuration")(JSON.parse(fs.readFileSync(argv.configFile, 'utf-8')));
    rawConfiguraiton.views.name = "app";
    rawConfiguraiton.views.type = "app";
    const componentConfiguration = Object.assign(rawConfiguraiton, require('./lib/generateComponentsHierarchy').default(rawConfiguraiton.views),
        {
            app: {
                type:"app",
                children: rawConfiguraiton.views.children.map(v => v.name)
            }
        });
    const modelConfiguration = _.pick(rawConfiguraiton, "model");
    const appConfiguration = Object.assign({}, componentConfiguration, modelConfiguration);

    const tmpDir = tmp.dirSync().name;
    if (argv.only === "classes") {
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