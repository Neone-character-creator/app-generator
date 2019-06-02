const yup = require('yup');
const _ = require("lodash");
const modelSchema = require("./model");
const viewSchema = require("./view");

module.exports = function (config) {
    const views = yup.object({
        children: yup.array().of(viewSchema())
    }).required().noUnknown(true);

    const model = yup.object().required().shape(Object.keys(config.model || {}).reduce((mapped, next) => {
        mapped[next] = modelSchema(config.model[next]);
        return mapped;
    }, {
        character: modelSchema(config.model.character)
    }));

    const schema = yup.object().shape({
        appName: yup.string().required(),
        model,
        views
    });

    return schema.validateSync(config, {
         abortEarly: false
    });
};