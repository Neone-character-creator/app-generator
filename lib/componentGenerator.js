const _ = require("lodash");
const generateComponent = require("./components/generateComponent");
const generateAppComponent = generateComponent("app")("app");
const generateViewComponent = generateComponent("view");


module.exports = async function (applicationConfiguration) {
    if (_.isEmpty(applicationConfiguration.views)) {
        throw new Error("No views to extract");
    }
    const components = {
        app: {
            path: '/app.js',
            content: generateAppComponent(applicationConfiguration)
        },
        views: {},
        components: {}
    };

    const views = applicationConfiguration.views;

    Object.keys(views).forEach(view => {
        components.views[view] = {
            path: `/views/${view}.js`,
            content: generateViewComponent(view)(applicationConfiguration)
        }
    });

    Object.keys(applicationConfiguration.components).forEach(componentName => {
        components.components[componentName] = {
            path: `/components/${componentName}.js`,
            content: generateComponent(applicationConfiguration.components[componentName].type)(componentName)(applicationConfiguration)
        }
    });

    return components;
};