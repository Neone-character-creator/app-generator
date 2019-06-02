const _ = require("lodash");
const models = require("./models");
module.exports = function(previousState, action) {
    if (action.type === "SET") {
        _.set(previousState, action.path, action.value);
        return {...previousState};
    }
    if(action.type === "REMOVE") {
        const array = _.get(previousState, action.path);
        if (!_.isArray(array)) {
            throw new Error(`value at path ${action.path} is not array!`);
        }
        array.splice(action.remove);
        return {...previousState};
    }
    if(action.type === "ADD") {
        const array = _.get(previousState, action.path);
        if (!_.isArray(array)) {
            throw new Error(`value at path ${action.path} is not array!`);
        }
        array.push(action.value);
        return {...previousState};
    }
    return previousState || new models.character();
};