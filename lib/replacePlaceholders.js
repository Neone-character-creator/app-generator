const _ = require("lodash");
module.exports = function(string, replacements) {
    return _.template(string)(replacements);
};