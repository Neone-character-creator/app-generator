const _ = require("lodash");
module.exports = function (name) {
    return _.upperFirst(name);
};