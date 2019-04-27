const yup = require('yup');
const _ = require("lodash");
const view = require("./view");

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