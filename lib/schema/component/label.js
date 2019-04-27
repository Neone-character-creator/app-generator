const yup = require('yup');
/**
 * Module to validate a component.
 * @param configFragment
 * @returns {*}
 */
module.exports = function component(configFragment) {
    return yup.object().required().shape({
        type: yup.mixed().oneOf(["label"]).required(), // Fixme: Extract these literals
        value: yup.string().required(),
    }).noUnknown(true);
};