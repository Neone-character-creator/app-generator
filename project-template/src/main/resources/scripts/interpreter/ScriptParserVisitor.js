// Generated from scripting/ScriptParser.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by ScriptParserParser.

function ScriptParserVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

ScriptParserVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
ScriptParserVisitor.prototype.constructor = ScriptParserVisitor;

// Visit a parse tree produced by ScriptParserParser#program.
ScriptParserVisitor.prototype.visitProgram = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ScriptParserParser#context_reference_prefix.
ScriptParserVisitor.prototype.visitContext_reference_prefix = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ScriptParserParser#literal_expression.
ScriptParserVisitor.prototype.visitLiteral_expression = function(ctx) {
  return this.visitChildren(ctx)[0];
};


// Visit a parse tree produced by ScriptParserParser#context_reference_path.
ScriptParserVisitor.prototype.visitContext_reference_path = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ScriptParserParser#context_reference_expression.
ScriptParserVisitor.prototype.visitContext_reference_expression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ScriptParserParser#numeric_expression.
ScriptParserVisitor.prototype.visitNumeric_expression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ScriptParserParser#expression.
ScriptParserVisitor.prototype.visitExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ScriptParserParser#expression_sequence.
ScriptParserVisitor.prototype.visitExpression_sequence = function(ctx) {
  return this.visitChildren(ctx);
};



exports.ScriptParserVisitor = ScriptParserVisitor;