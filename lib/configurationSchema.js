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
    const views = yup.object().required().default({
        summary: defaultSummaryProperties
    }).shape(Object.keys(!_.isNil(config.views) && !_.isEmpty(config.views) ? config.views : {
        summary: view
    }).reduce((mapped, next) => {
        mapped[next] = next === 'summary' ? summaryView : view;
        return mapped;
    }, {})).required();


    const schema = yup.object().shape({
        views
    });

    return schema.validate(config);
};