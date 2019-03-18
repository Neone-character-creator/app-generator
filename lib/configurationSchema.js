const yup = require('yup');
const _ = require("lodash");

function view(configSchema) {
    return yup.object().required().shape({
        name: yup.string().required().min(1),
        children: yup.object().required().shape(Object.keys(configSchema.children || {}).reduce((reduced, nextkey) => {
            reduced[nextkey] = component(configSchema.children[nextkey]);
            return reduced;
        }, {}))
    });
}

function component(configFragment) {
    return yup.object().required().shape({
        type: yup.mixed().oneOf(["container", "textfield", "number"]).required(),
        direction: yup.string().when("type", {
            is: "container",
            then: yup.string().oneOf(["vertical", "horizontal"]),
            ortherwise: null,
        }),
        children: yup.mixed().when("type", {
            is: "container",
            then: yup.object().required().shape(Object.keys(configFragment.children || {}).reduce((reduced, nextkey) => {
                reduced[nextkey] = component(configFragment.children[nextkey]);
                return reduced;
            }, {})),
            otherwise: null,
        }),
        label : yup.mixed().when("type", {
            is: "textfield",
            then: yup.string()
        })
    });
};

const defaultSummaryProperties = {
    name: "Character"
};

const summaryView = yup.object().required().default(defaultSummaryProperties).shape({
    name: yup.string().min(1).default(defaultSummaryProperties.name)
});

module.exports = function (config) {
    const views = yup.object().required().shape({
        children: yup.object().shape(Object.keys(config.views.children || {}).reduce((mapped, next) => {
            mapped[next] = view(config.views.children[next]);
            return mapped;
        }, {}))
    });

    const schema = yup.object().shape({
        views
    });

    return schema.validateSync(config, {
        abortEarly: false
    });
};