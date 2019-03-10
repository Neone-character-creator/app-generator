const _ = require("lodash");
const generateAppComponent = require("./components/generateComponent")("app")("app");
const generateViewComponent = require("./components/generateComponent")("view");

module.exports = async function (applicationConfiguration) {
    if (_.isEmpty(applicationConfiguration.views)) {
        throw new Error("No views to extract");
    }
    const components = {
        app: {
            path: '/app.js',
            content: generateAppComponent(applicationConfiguration)
        },
        views: {}
    };

    const views = applicationConfiguration.views;

    Object.keys(views).forEach(view => {
        components.views[view] = {
            path: `/views/${view}.js`,
            content: generateViewComponent(view)(applicationConfiguration)
        }
    });
    return components;
};