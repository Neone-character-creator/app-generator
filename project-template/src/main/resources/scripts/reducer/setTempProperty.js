import _ from "lodash";

function setTempProperty(state, actionType, path, value) {
    switch (actionType) {
        case "SET":
            _.set(state, "$temp." + path, value);
            break;
        case "PUSH":
            const arrayForPush = _.get(state, path);
            arrayForPush.push(value);_.set
            break;
        case "REMOVE":
            const arrayForRemove = _.get(state, path, []);
            arrayForRemove.splice(value, 1);
            break;
    }
    return state;
}

export default setTempProperty;