const Parser = require("./ScriptParserParser").ScriptParserParser;
const baseVisitor = require("./ScriptParserVisitor").ScriptParserVisitor;
const _ = require("lodash");

// This class defines a complete generic visitor for a parse tree produced by ScriptParser.

function Visitor(scriptContext) {
    this.scriptContext = scriptContext;
}

Visitor.prototype = baseVisitor.prototype;

Visitor.prototype.constructor = Visitor;

Visitor.prototype.visitProgram = function (ctx) {
    const children = this.visitChildren(ctx);
    return children[0];
};

Visitor.prototype.visitExpression_sequence = function (ctx) {
    const children = this.visitChildren(ctx);
    return children[children.length - 1];
};

Visitor.prototype.visitExpression = function (ctx) {
    const children = this.visitChildren(ctx);
    if (children.length === 3) {
        switch (children[1].type) {
            case Parser.PLUS_LITERAL:
                return children[0] + children[2];
            case Parser.MULTIPLY_LITERAL:
                return children[0] * children[2];
            case Parser.DIVIDE_LITERAL:
                return Math.floor(children[0] / children[2]);
            case Parser.SUBTRACT_LITERAL:
                return children[0] - children[2];
        }
    } else if (children.length === 1) {
        return children[0];
    }
};

Visitor.prototype.visitContext_reference_expression = function(ctx){
    const children = this.visitChildren(ctx);
    children.splice(1, 1);
    const path = children.join(".");
    const value = _.get(this.scriptContext, path );
    return value;
};

Visitor.prototype.visitContext_reference_path = function(ctx){
    const children = this.visitChildren(ctx);
    return children.filter(x => typeof x === "string").join(".");
};

Visitor.prototype.visitContext_reference_prefix = function(ctx) {
    return this.visitChildren(ctx)[0];
};

Visitor.prototype.visitNumeric_expression = function(ctx){
    return this.visitChildren(ctx)[0];
};

// Visitor.prototype.visitLiteral_expression = function (ctx) {
//     let value;
//     switch (ctx.children[0].symbol.type) {
//         case Parser.STRING_LITERAL:
//             value = ctx.children[0].getText();
//         case Parser.NUMBER_LITERAL:
//             value = Number.parseInt(ctx.children[0].getText());
//     }
//     return visit;
// };

Visitor.prototype.visitTerminal = function (ctx) {
    switch (ctx.symbol.type) {
        case Parser.NUMBER_LITERAL:
            return Number.parseInt(ctx.getText());
        case Parser.STRING_LITERAL:
        case Parser.CONTEXT_STATE_PREFIX:
        case Parser.CONTEXT_MODEL_PREFIX:
            return ctx.getText();
        default:
            return ctx.symbol;
    }
}

module.exports = Visitor;