const yup = require('yup');

const view = yup.object().shape({});

const views = yup.object().required().test('views', '${path} is not a valid view configuration', views => {
    if (!views) {
        return Promise.reject(new yup.ValidationError('Required element views is undefined or null'));
    }
    if (!views['summary']) {
        return Promise.reject(new yup.ValidationError(`views is missing required field 'summary'.`));
    }
    return Promise.resolve(Object.keys(views).reduce((mapped, key) => {

        mapped[key] =view.validate(views[key], {strict: true});
        return mapped;
    }, {}));
});

const schema = yup.object().shape({
    views
});

module.exports = schema.strict(true);