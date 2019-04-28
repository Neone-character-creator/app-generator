const _ = require("lodash");
module.exports = function(previousState, action) {
    if (action.TYPE === "set") {
        _.set(previousState, action.path, action.value);
        return {...previousState};
    }
    if(action.TYPE === "remove") {
        const array = _.get(previousState, action.path);
        if (!_.isArray(array)) {
            throw new Error(`value at path ${action.path} is not array!`);
        }
        array.splice(action.remove);
        return {...previousState};
    }
    if(action.TYPE === "add") {
        const array = _.get(previousState, action.path);
        if (!_.isArray(array)) {
            throw new Error(`value at path ${action.path} is not array!`);
        }
        array.push(action.value);
        return {...previousState};
    }
    return previousState;
};