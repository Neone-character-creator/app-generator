const yup = require('yup');


const view = yup.object().required().shape({
    name: yup.string().required().min(1)
});

const summaryView = yup.object().required().shape({
    name: yup.string().min(1).default("Character")
});

module.exports = function (config) {
    const views = yup.object().required().shape(Object.keys(config.views || {
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