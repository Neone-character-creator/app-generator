const yup = require('yup');
const _ = require("lodash");
const modelSchema = require("./model");
const viewSchema = require("./view");

module.exports = function (config) {
    const views = yup.object({
        children: yup.array().of(viewSchema()).required()
    }).required().noUnknown(true);

    const model = yup.object().required().shape(Object.keys(config.model || {}).reduce((mapped, next) => {
        mapped[next] = modelSchema(config.model)(config.model[next]);
        return mapped;
    }, {
        character: modelSchema(_.get(config, "model", {}))(_.get(config, "model.character", {})).required()
    }));

    const schema = yup.object().shape({
        gameName: yup.string().required(),
        authorName: yup.string().required(),
        pluginVersion: yup.string().required(),
        toolVersion: yup.string(),
        pdfPath: yup.string(),
        fieldsPath: yup.string(),
        model,
        views
    });

    return schema.validateSync(config, {
         abortEarly: false
    });
};