const yup = require('yup');
const _ = require("lodash");

const view = yup.object().required().shape({
    name: yup.string().required().min(1)
});

const defaultSummaryProperties = {
    name: "Character"
};

const summaryView = yup.object().required().default(defaultSummaryProperties).shape({
    name: yup.string().min(1).default(defaultSummaryProperties.name)
});

module.exports = function (config) {
    const calculatedViewsShape = {
        children: yup.object().shape(Object.keys(config.views.children).reduce((mapped, next) => {
            mapped[next] = next === 'summary' ? summaryView : view;
            return mapped;
        }, {}))
    };
    const views = yup.object().required().shape(calculatedViewsShape);

    const schema = yup.object().shape({
        views
    });

    return schema.validate(config);
};