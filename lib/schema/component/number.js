const yup = require('yup');
/**
 * Module to validate a component.
 * @param configFragment
 * @returns {*}
 */
module.exports = function component(configFragment) {
    return yup.object().required().shape({
        type: yup.mixed().oneOf(["number"]).required(), // Fixme: Extract these literals
        bind: yup.string()
    }).noUnknown(true);
};