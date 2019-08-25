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
    element.identifier = element.name + "-" + element.type;
    if (components.components[element.identifier]) {
        throw new Error("Duplicate component " + element.name + " " + element.type + " found");
    }
    if (element.type == "view") {
        components.views.push(element.identifier);
    }
    components.components[element.identifier] = element;
    var children = element.children;
    if (!lodash_1.default.isEmpty(children)) {
        children.forEach(function (child) {
            extractComponentDefinitions(components, child);
        });
        element.children = element.children.map(function (child) {
            return child.identifier;
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
    if (!element.identifier) {
        throw new Error("Component " + element.name + " has no identifier");
    }
    if (!lodash_1.default.isEmpty(children)) {
        children.forEach(function (child) {
            extractComponentDefinitions(components, child);
        });
    }
    if (element.children) {
        element.children = element.children.map(function (child) {
            return child.identifier;
        });
    }
    components.components[element.identifier] = element;
    return components;
}
