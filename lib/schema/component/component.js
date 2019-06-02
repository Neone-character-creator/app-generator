const yup = require("yup");
const componentSchema = yup.object().required().shape({
    click: yup.string(),
    bind: yup.string(),
    children: yup.array().when("type", {
        is: "container",
        then: s => s.of(componentSchema)
    }),
    direction: yup.string().when("type", {
        is: "container",
        then: s => s.oneOf(["vertical", "horizontal"]).required()
    }).oneOf(["vertical", "horizontal"]),
    label: yup.string().when("type", {
        is: "textfield",
        then: s => s.required()
    }),
    items: yup.object().when("type", {
        is: "select",
        then: yup.object({
            text: yup.string().required()
        }).required(),
        otherwise: yup.object().notRequired()
    }),
    name: yup.string().required(),
    type: yup.string().oneOf(["checkbox", "container", "label", "number", "select", "textfield"]).required(), // Fixme: Extract these literals
    value: yup.string().when("type", {
        is: v => ["label"].includes(v),
        then: s => s.required()
    })
}).test("foo", "$path cannot have both bind and click", value => {
    return (value.click === undefined && value.bind === undefined) || ((value.click || value.bind) && !(value.click && value.bind));
}).noUnknown(true).strict();

module.exports = () => componentSchema;