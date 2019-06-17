const antlr4 = require("antlr4");
const Lexer = require("./JavaScriptLexer").JavaScriptLexer;
const Parser = require("./JavaScriptParser").JavaScriptParser;
const Visitor = require("./visitor");
module.exports = {
    interpret: function(expression, context){

        return new Function("$state", "$model", expression)(context.$state, context.$model);
    }
};