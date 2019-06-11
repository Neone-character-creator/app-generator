"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
function default_1(rootComponent) {
    return __assign({}, extractComponentDefinitions({
        components: {},
        views: []
    }, rootComponent));
}
exports.default = default_1;
;
function extractComponentDefinitions(components, element) {
    if (components.components[element.name]) {
        throw new Error("Duplicate component " + element.name + " found");
    }
    if (element.type == "view") {
        components.views.push(element.name);
    }
    components.components[element.name] = element;
    var children = element.children;
    if (!lodash_1.default.isEmpty(children)) {
        children.forEach(function (child) {
            extractComponentDefinitions(components, child);
        });
        element.children = element.children.map(function (child) {
            return child.name;
        });
    }
    var listChild = lodash_1.default.get(element, "items.child");
    if (!lodash_1.default.isNil(listChild)) {
        extractComponentDefinitions(components, listChild);
    }
    return components;
}
function extractViewDefinition(components, element) {
    var children = element.children;
    if (!lodash_1.default.isEmpty(children)) {
        children.forEach(function (child) {
            extractComponentDefinitions(components, child);
        });
    }
    if (element.children) {
        element.children = element.children.map(function (child) {
            return child.name;
        });
    }
    components.components[element.name] = element;
    return components;
}
