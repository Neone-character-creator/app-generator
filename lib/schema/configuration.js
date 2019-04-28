const yup = require('yup');
const _ = require("lodash");
const view = require("./view");

module.exports = function (config) {
    const views = yup.object().required().shape({
        children: yup.object().shape(Object.keys(config.views.children || {}).reduce((mapped, next) => {
            mapped[next] = view(config.views.children[next]);
            return mapped;
        }, {})).required()
    });

    const model = yup.object().required().shape(Object.keys(config.model || {}).reduce((mapped, next) => {

    }, {
        character: yup.object().required()
    }));

    const schema = yup.object().shape({
        model,
        views
    });

    return schema.validateSync(config, {
         abortEarly: false
    });
};