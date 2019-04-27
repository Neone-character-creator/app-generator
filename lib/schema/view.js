const yup = require('yup');
const component = require("./component");
/**
 * Module validates a view json configuration.
 * @param configSchema
 * @returns {*}
 */
module.exports = function view(configSchema) {
    return yup.object().required().shape({
        name: yup.string().required().min(1),
        children: yup.object().required().shape(Object.keys(configSchema.children || {}).reduce((reduced, nextkey) => {
            reduced[nextkey] = component(configSchema.children[nextkey]);
            return reduced;
        }, {}))
    });
};