const yup = require('yup');
/**
 * Module to validate a component.
 * @returns {*}
 */
module.exports = function component() {
    return yup.object().noUnknown(true).required().shape({
        type: yup.mixed().oneOf(["textfield"]).required(),
        bind: yup.string(),
        label: yup.string()
    }).strict();
};