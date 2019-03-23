const _ = require("lodash");
const generateComponent = require("./components/generateComponent");

const paths = new Proxy({}, {
    get: function(target, property) {
        switch (property) {
            case "app":
                return function(){
                    return 'components/App.js'
                };
            default:
                return function(name){
                    return `components/${name.substring(0, 1).toUpperCase() + name.substring(1)}${property.substring(0, 1).toUpperCase() + property.substring(1)}.js`
                };
        }
    }
});

module.exports = async function (applicationConfiguration) {
    const hierarchy = {
        components: {}
    };

    Object.keys(applicationConfiguration.components).forEach(componentName => {
        const componentType = applicationConfiguration.components[componentName].type;
        hierarchy.components[componentName] = {
            path: paths[componentType](componentName, componentType),
            content: generateComponent(componentType)(componentName)(applicationConfiguration)
        }
    });

    return hierarchy;
};