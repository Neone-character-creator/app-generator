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
function default_1(appConfiguration) {
    return __assign({}, extractComponentDefinitions({
        components: {},
        views: []
    }, "app", appConfiguration.views));
}
exports.default = default_1;
;
function extractComponentDefinitions(components, componentId, element) {
    if (components.components[componentId]) {
        throw new Error("Duplicate component " + componentId + " found");
    }
    if (element.type == "view") {
        components.views.push(componentId);
    }
    components.components[componentId] = element;
    var children = element.children;
    if (!lodash_1.default.isEmpty(children)) {
        children.forEach(function (child) {
            extractComponentDefinitions(components, child.name, child);
        });
    }
    components.components[componentId] = element;
    if (element.children) {
        element.children = element.children.map(function (child) {
            return child.name;
        });
    }
    return components;
}
function extractViewDefinition(components, componentId, element) {
    var children = element.children;
    if (!lodash_1.default.isEmpty(children)) {
        children.forEach(function (child) {
            extractComponentDefinitions(components, child.name, child);
        });
    }
    if (element.children) {
        element.children = element.children.map(function (child) {
            return child.name;
        });
    }
    components.components[componentId] = element;
    return components;
}
