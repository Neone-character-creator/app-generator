const yup = require("yup");
const componentSchema = yup.object().required().shape({
    bind: yup.string(),
    children: yup.array().when("type", {
        is: "container",
        then : s => s.of(componentSchema)
    }),
    direction: yup.string().when("type", {
        is: "container",
        then: s => s.oneOf(["vertical", "horizontal"]).required()
    }).oneOf(["vertical", "horizontal"]),
    label: yup.string().when("type", {
        is: "textfield",
        then: s => s.required()
    }),
    name: yup.string().required(),
    type: yup.string().oneOf(["checkbox", "container", "label", "number", "select", "textfield"]).required(), // Fixme: Extract these literals
    value: yup.string().when("type", {
        is: v => ["select", "label"].includes(v),
        then: s => s.required()
    })
}).noUnknown(true).strict();

module.exports = () => componentSchema;