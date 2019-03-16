const _ = require("lodash");
const generateComponent = require("./components/generateComponent");
const generateAppComponent = generateComponent("app")("app");
const generateViewComponent = generateComponent("view");

const babel = require("@babel/core");

const babelOptions = {
    presets: ["@babel/preset-react", "@babel/preset-env"],
};

module.exports = async function (applicationConfiguration) {
    if (_.isEmpty(applicationConfiguration.views)) {
        throw new Error("No views to extract");
    }
    const components = {
        app: {
            path: 'app.js',
            content: babel.transformSync(generateAppComponent(applicationConfiguration), babelOptions).code
        },
        views: {},
        components: {}
    };

    const views = applicationConfiguration.views;

    views.forEach(view => {
        components.views[view] = {
            path: `views/${view}.js`,
            content: babel.transformSync(generateViewComponent(view)(applicationConfiguration), babelOptions).code
        }
    });

    Object.keys(applicationConfiguration.components).forEach(componentName => {
        components.components[componentName] = {
            path: `components/${componentName}.js`,
            content: babel.transformSync(generateComponent(applicationConfiguration.components[componentName].type)(componentName)(applicationConfiguration), babelOptions).code
        }
    });

    return components;
};