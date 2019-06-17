const Parser = require("./JavaScriptParser").JavaScriptParser;
const JavaScriptParserVisitor = require("./JavaScriptParserVisitor").JavaScriptParserVisitor;
const _ = require("lodash");

const globals = global || window;

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
    let value = children.reduce((intermediate, next, index, array)=>{
        switch (typeof intermediate) {
            case "object":
                if(next === "."){
                    return intermediate;
                }
                const nextValue = _.get(intermediate, next);
                if (typeof nextValue === "function") {
                    return {
                        func: nextValue,
                        boundThis: intermediate
                    }
                }
                return nextValue;
            case "string":
                return _.get(this.scriptContext, intermediate);
        }
        return intermediate;
    });
    return value;
};

Visitor.prototype.visitIdentifierName = function (ctx) {
    const children = this.visitChildren(ctx);
    return children[0];
};

Visitor.prototype.visitIdentifierExpression = function (ctx) {
    return this.visitChildren(ctx)[0];
};

Visitor.prototype.visitArguments = function(ctx){
    return this.visitChildren(ctx).filter(arg => {
        if (arg.type) {
            switch (arg.type) {
                case Parser.OpenParen:
                case Parser.CloseParen:
                    return false;
                default:
                    return true;
            }
        }
        return true;
    })
}

Visitor.prototype.visitArgumentsExpression = function (ctx) {
    const children = this.visitChildren(ctx);
    if (_.isObject(children[0]) && children[0].func) {
        const funcArguments = children[1].map(x => {
            if (typeof x === "string" && x.startsWith("'") && x.endsWith("'")){
                return x.substring(1, x.length-1);
            }
            return x;
        });
        const func = children[0].func;
        return func.apply(children[0].boundThis, funcArguments);
    }
    return children[0];
};

Visitor.prototype.visitFunctionExpression = function(ctx){
    const children = this.visitChildren(ctx);
    const args = children[2];
    const method = children[5];
};

Visitor.prototype.visitFunctionBody = function(ctx){
    const children = this.visitChildren(ctx);
    return children;
}


module.exports = Visitor;