const checkbox = require("./checkbox");
const container = require("./container");
const label = require("./label");
const number = require("./number");
const select = require("./select");
const textfield = require("./textfield");

module.exports = function component(configFragment) {
    switch (configFragment.type) {
        case "container":
            return container(configFragment);
        case "textfield":
            return textfield(configFragment);
        case "number":
            return number(configFragment);
        case "select":
            return select(configFragment);
        case "label":
            return label(configFragment);
        case "checkbox":
            return checkbox(configFragment);
        default:
            throw new Error(`Type ${configFragment.type} unsupported.`);
    }
};