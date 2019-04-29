const yup = require('yup');
module.exports = function (configFragment) {
    const component = require("./component");
    return yup.object().required().shape({
        type: yup.string().oneOf(["container"]).required(), // Fixme: Extract these literals

        children: yup.object().required()
            .test("children", "children must have at least one key",  e => Object.getOwnPropertyNames(e || {}).length)
            .shape(Object.keys(configFragment.children || {}).reduce((reduced, nextkey) => {
                reduced[nextkey] = component(configFragment.children[nextkey]);
                return reduced;
            }, {}))
    }).noUnknown(true).strict();
};