const argv = require('yargs').argv;
const fs = require('fs-extra');
const _ = require("lodash");
const paths = require("path");
const PluginGenerator = require("./lib/pluginGenerator");
const ModelClassGenerator = require("./lib/classGenerator");
const ModelClassWriter = require("./lib/model/writer");
const tmp = require("tmp");
const package = require("./package.json");

if (!argv.configFile) {
    throw new Error("--configFile is missing.");
}

function work(configFileLocation) {
    try {
        configFileLocation = paths.resolve(configFileLocation);
        const parent = paths.resolve(configFileLocation, "..");
        const rawConfiguration = require("./lib/schema/configuration")(JSON.parse(fs.readFileSync(configFileLocation, 'utf-8')));
        rawConfiguration.views.name = "app";
        rawConfiguration.views.type = "app";
        const componentConfiguration = Object.assign(rawConfiguration, require('./lib/generateComponentsHierarchy').default(rawConfiguration.views),
            {
                app: {
                    type: "app",
                    children: rawConfiguration.views.children.map(v => v.identifier)
                }
            });
        const modelConfiguration = _.pick(rawConfiguration, "model");
        const appConfiguration = Object.assign({}, componentConfiguration, modelConfiguration);

        const tmpDir = tmp.dirSync().name;
        if (argv.only === "classes") {
            const modelSources = new ModelClassGenerator(appConfiguration.model, tmpDir).generate();
            ModelClassWriter(tmpDir, modelSources);
            return;
        }
        appConfiguration.alphanumericGameName = appConfiguration.gameName.replace(/\W/g, "");
        console.log(appConfiguration.alphanumericGameName);
        appConfiguration.toolVersion = package.version;
        appConfiguration.rootDir = parent;
        var pluginGenerator = new PluginGenerator(appConfiguration, tmpDir);
        return pluginGenerator.generate().catch(e => console.error(e));
    } catch (e) {
        if (e.errors) {
            e.errors.forEach(error => {
                console.error(error);
            })
        } else {
            console.error(e);
        }
    }
}

function logWatchMessage(){
    console.log("\x1b[32mWatching your configuration file for changes.\x1b[0m");
}

if(argv.watch) {
    work(argv.configFile).then(logWatchMessage);
    fs.watchFile(argv.configFile, {
        interval: 2500
    }, ()=>{
        console.log("File changed, rebuilding...")
        work(argv.configFile);
        logWatchMessage()
    });
} else {
    work(argv.configFile);
}