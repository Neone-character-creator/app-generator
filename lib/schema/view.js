const yup = require('yup');
const component = require("./component");
/**
 * Module validates a view json configuration.
 * @param configSchema
 * @returns {*}
 */
module.exports = function view() {
    return yup.object({
        name: yup.string().required(),
        type: yup.string().oneOf(["view"]).required(),
        direction: yup.string().oneOf(["vertical", "horizontal"]).default("vertical"),
        children: yup.array().of(component()).required(),
        items: yup.object().when("type", {
            is: "select",
            then: yup.object({
                text: yup.string().required(),
                values: yup.string().required()
            })
        }).when("type", {
            is: "list",
            then: yup.object({
                child: yup.object().required()
            }).required()
        })
    }).required();
};