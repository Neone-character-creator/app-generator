const _ = require("lodash");

const calculateTransformers = function (state, actionType, path, value) {
    state.transformers = state.transformers.filter(transformer => {
        switch (actionType) {
            case "SET":
                return path !== transformer.path || actionType !== transformer.action;
            case "REMOVE":
                if (!_.isNumber(value)) {
                    throw new Error(`For REMOVE, value must be an index but was ${typeof value}`);
                }
                return path !== transformer.path || transformer.index !== value;
        }
        return true;
    });
    const transformerToAdd = generateTransformerFromAction(state, actionType, path, value)
    if (transformerToAdd) {
        state.transformers.push(transformerToAdd);
    }
};

const generateTransformerFromAction = function (state, actionType, path, value) {
    switch (actionType) {
        case "SET":
            return generateSetTransformer(state, path, value);
        case "PUSH":
            return generatePushTransformer(state, path, value);
    }
};

const generateSetTransformer = function (state, path, value) {
    return {
        action: "SET",
        path,
        value
    };
};

const generatePushTransformer = function (state, path, value) {
    return {
        action: "PUSH",
        path,
        value,
        index: _.get(state, path, []).length
    };
};

export default calculateTransformers;