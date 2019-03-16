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
            path: 'components/App.js',
            content: generateAppComponent(applicationConfiguration)
        },
        views: {},
        components: {}
    };

    const views = applicationConfiguration.views;

    views.forEach(view => {
        components.views[view] = {
            path: `components/${view.substring(0, 1).toUpperCase() + view.substring(1)}View.js`,
            content: generateViewComponent(view)(applicationConfiguration)
        }
    });

    Object.keys(applicationConfiguration.components).forEach(componentName => {
        const componentType = applicationConfiguration.components[componentName].type;
        components.components[componentName] = {
            path: `components/${componentName.substring(0, 1).toUpperCase() + componentName.substring(1)}${componentType.substring(0, 1).toUpperCase() + componentType.substring(1)}.js`,
            content: generateComponent(componentType)(componentName)(applicationConfiguration)
        }
    });

    return components;
};