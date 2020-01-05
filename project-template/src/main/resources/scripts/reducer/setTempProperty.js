import _ from "lodash";

function setTempProperty(state, actionType, path, value) {
    const tempPath = "$temp." + path;
    switch (actionType) {
        case "SET":
            _.set(state, tempPath, value);
            break;
        case "PUSH":
            const arrayForPush = getOrInitializeArray(tempPath, state);
            arrayForPush.push(value);
            break;
        case "REMOVE":
            const arrayForRemove = _.get(state, tempPath, []);
            arrayForRemove.splice(value, 1);
            break;
    }
    return state;
}

function getOrInitializeArray(path, state) {
    let array = _.get(state, path);
    if (array === undefined) {
        array = [];
        _.set(state, path, array);
    }
    if (!_.isArray(array)) {
        throw new Error("Tried to push to " + path + " but the value already there is not an array!");
    }
    return array;
}

export default setTempProperty;