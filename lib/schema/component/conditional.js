const yup = require("yup");

const def = yup.object({
    any: yup.array().test('stringOrConditional', '${path} must be a string or conditional object', function (value) {
        return value.reduce((anyMatch, next) => {
            return anyMatch || _.isString(next) || def.isValidSync(next);
        });
    }),
    all: yup.array().test('stringOrConditional', '${path} must be a string or conditional object', function (value) {
        return value.reduce((anyMatch, next) => {
            return allMatch && (_.isString(next) || def.isValidSync(next));
        });
    })
}).test(
    'any-or-all',
    "${path} can't define both 'any' and 'all'",
    function(value){
        return (value.all !== undefined || value.any !== undefined) && !(value.all !== undefined && value.any !== undefined)
    }
);

module.exports = def;