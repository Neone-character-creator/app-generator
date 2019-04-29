const yup = require('yup');
const component = require("./component");
/**
 * Module validates a view json configuration.
 * @param configSchema
 * @returns {*}
 */
module.exports = function view() {
    return yup.object().required().shape({
        name: yup.string().required().min(1),
        children: yup.array().of(component()).required()
    });
};