const Parser = require("./JavaScriptParser").JavaScriptParser;
const JavaScriptParserVisitor = require("./JavaScriptParserVisitor").JavaScriptParserVisitor;
const _ = require("lodash");

// This class defines a complete generic visitor for a parse tree produced by ScriptParser.

function Visitor(scriptContext) {
    this.scriptContext = scriptContext;
}

Visitor.prototype = JavaScriptParserVisitor.prototype;

Visitor.prototype.constructor = Visitor;

Visitor.prototype.visitProgram = function (ctx) {
    const children = this.visitChildren(ctx);
    return children.length ? children[0] : undefined;
};

Visitor.prototype.visitExpressionStatement = function (ctx) {
    const children = this.visitChildren(ctx);
    return _.get(this.scriptContext, children[0]);
};

Visitor.prototype.visitLiteralExpression = function (ctx) {
    const children = this.visitChildren(ctx);
    return children[0];
};

Visitor.prototype.visitExpressionSequence = function (ctx) {
    const children = this.visitChildren(ctx);
    return children[0];
};

Visitor.prototype.visitNumericLiteral = function (ctx) {
    const children = this.visitChildren(ctx);
    return children[0];
};

Visitor.prototype.visitLiteral = function (ctx) {
    const children = this.visitChildren(ctx);
    return children[0];
};

Visitor.prototype.visitAdditiveExpression = function (ctx) {
    const children = this.visitChildren(ctx);
    switch (children[1].type) {
        case Parser.Plus:
            return children[0] + children[2];
        case Parser.Minus:
            return children[0] - children[2];
    }
};

Visitor.prototype.visitMultiplicativeExpression = function (ctx) {
    const children = this.visitChildren(ctx);
    switch (children[1].type) {
        case Parser.Divide:
            return children[0] / children[2];
        case Parser.Multiply:
            return children[0] * children[2];
    }
};

Visitor.prototype.visitTerminal = function (ctx) {
    switch (ctx.symbol.type) {
        case Parser.DecimalLiteral:
            return Number.parseFloat(ctx.getText());
        case Parser.StringLiteral:
        case Parser.Identifier:
        case Parser.Dot:
            return ctx.getText();
        default:
            return ctx.symbol;
    }
};
Visitor.prototype.visitStatement = function (ctx) {
    const children = this.visitChildren(ctx).filter(x => x !== undefined);
    return children.length ? children[0] : undefined;
};

Visitor.prototype.visitReturnStatement = function (ctx) {
    const children = this.visitChildren(ctx);
    return children[1];
};

Visitor.prototype.visitSourceElement = function (ctx) {
    const children = this.visitChildren(ctx);
    return children[0];
};

Visitor.prototype.visitSourceElements = function (ctx) {
    const children = this.visitChildren(ctx);
    return children[0];
};

Visitor.prototype.visitMemberDotExpression = function (ctx) {
    const children = this.visitChildren(ctx);
    const path = children.slice(2).join("");
    const value = _.get(children[0], path);
    if (typeof value === "function") {
        return {
            boundThis: children[0],
            func: value
        }
    }
    return value;
};

Visitor.prototype.visitIdentifierName = function (ctx) {
    const children = this.visitChildren(ctx);
    return children[0];
};

Visitor.prototype.visitIdentifierExpression = function (ctx) {
    const children = this.visitChildren(ctx);
    return _.get(this.scriptContext, children[0]);
};

Visitor.prototype.visitArgumentsExpression = function (ctx) {
    const children = this.visitChildren(ctx);
    if (_.isObject(children[0]) && children[0].func) {
        const funcArguments = children[1].slice(1, children[1].length - 1).map(x => {
            if (x.startsWith("'") && x.endsWith("'")){
                return x.substring(1, x.length-1);
            }
            return x;
        });
        return children[0].func.apply(children[0].boundThis, funcArguments);
    }
    return children[0];
};

module.exports = Visitor;