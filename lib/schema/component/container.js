const yup = require('yup');
module.exports = function(configFragment){
    const component = require("./component");
    return yup.object().required().shape({
        type: yup.string().oneOf(["container"]).required(), // Fixme: Extract these literals
        direction: yup.string().oneOf(["vertical", "horizontal"]),
        children: yup.object().required().shape(Object.keys(configFragment.children || {}).reduce((reduced, nextkey) => {
            reduced[nextkey] = component(configFragment.children[nextkey]);
            return reduced;
        }, {}))
    }).noUnknown(true);
};