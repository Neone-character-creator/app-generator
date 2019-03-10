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
    return __assign({}, appConfiguration, extractComponentDefinitions({
        views: {},
        components: {}
    }, "views", appConfiguration.views));
}
exports.default = default_1;
;
function extractComponentDefinitions(components, componentId, element) {
    if (componentId === "views") {
        if (components.views[componentId]) {
            throw new Error("Duplicate view found: " + componentId);
        }
        Object.keys(element.children).forEach(function (child) {
            extractViewDefinition(components, child, element.children[child]);
        });
    }
    else {
        if (components.components[componentId]) {
            throw new Error("Duplicate component found");
        }
        components.components[componentId] = element;
        var children_1 = element.children;
        if (!lodash_1.default.isEmpty(children_1)) {
            Object.keys(children_1).forEach(function (child) {
                extractComponentDefinitions(components, child, children_1[child]);
            });
        }
        if (element.children) {
            element.children = Object.keys(element.children);
        }
    }
    return components;
}
function extractViewDefinition(components, componentId, element) {
    if (components.views[componentId]) {
        throw new Error("Duplicate component found");
    }
    components.views[componentId] = element;
    var children = element.children;
    if (!lodash_1.default.isEmpty(children)) {
        Object.keys(children).forEach(function (child) {
            extractComponentDefinitions(components, child, children[child]);
        });
    }
    if (element.children) {
        element.children = Object.keys(element.children);
    }
    return components;
}
