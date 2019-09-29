const yup = require("yup");
const conditional = require("./conditional");
const _ = require("lodash");
const componentSchema = yup.object().required().shape({
    bind: yup.string(),
    children: yup.array().when("type", {
        is: "container",
        then: s => s.of(componentSchema)
    }),
    click: yup.string(),
    direction: yup.string().when("type", {
        is: "container",
        then: s => s.oneOf(["vertical", "horizontal"]).default("horizontal")
    }).oneOf(["vertical", "horizontal"]),
    border: yup.string(),
    items: yup.object().when("type", {
        is: "select",
        then: yup.object({
            text: yup.string().ensure(),
            values: yup.string().required()
        }).required(),
        otherwise: yup.object().notRequired()
    }),
    keyProperty: yup.string(),
    label: yup.string().when("type", {
        is: "textfield",
        then: s => s.required()
    }),
    name: yup.string().required(),
    readOnly: yup.boolean(),
    text: yup.string().when("type", {
        is: v => ["label"].includes(v),
        then: s => s.required()
    }),
    disabledWhen: yup.mixed().test('object-or-string', '${path} must be a string or object', function(value){
        return value === undefined || _.isString(value)|| conditional.isValidSync(value);
    }),
    weight: yup.number(),
    type: yup.string().oneOf(["checkbox", "container", "label", "number", "select", "textfield", "list", "button"]).required(), // Fixme: Extract these literals
    value: yup.string(),
    action: yup.mixed(),
    hiddenWhen: yup.mixed().test('object-or-string', '${path} must be a string or conditional object', function(value){
        return value === undefined || _.isString(value)|| conditional.isValidSync(value);
    }),
}).test("foo", "$path cannot have both bind and click", value => {
    return (value.click === undefined && value.bind === undefined) || ((value.click || value.bind) && !(value.click && value.bind));
}).noUnknown(true).strict();

module.exports = () => componentSchema;