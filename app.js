const argv = require('yargs').argv;
const fs = require('fs-extra');

if (!argv.configFile) {
    throw new Error("--configFile is missing.");
}

const configFile = require("./lib/configurationSchema")(JSON.parse(fs.readFileSync(argv.configFile, 'utf-8')));
const configuration = require('./lib/generateComponentsHierarchy').default(configFile);

const clean = !fs.existsSync(`plugin-${configuration.appName}`);

if (!clean) {
    throw new Error('Output directory already exists. Delete it or choose a different project name.');
}

require('./lib/pluginGenerator')(configuration, argv.scaffold).catch(e => console.error(e));