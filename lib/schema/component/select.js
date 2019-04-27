const yup = require('yup');
/**
 * Module to validate a component.
 * @param configFragment
 * @returns {*}
 */
module.exports = function component(configFragment) {
    return yup.object().required().shape({
        type: yup.mixed().oneOf(["select"]).required(), // Fixme: Extract these literals
        values: yup.mixed().test("string-or-array", "${path} must be a string or array",
            (value) => {
                return typeof value === "string" || typeof value === "array";
            }),
    }).noUnknown(true).strict();
};