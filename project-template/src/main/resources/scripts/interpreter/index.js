const antlr4 = require("antlr4");
const Lexer = require("./ScriptParserLexer").ScriptParserLexer;
const Parser = require("./ScriptParserParser").ScriptParserParser;
const Visitor = require("./visitor");
module.exports = {
    interpret: function(expression, context){
        const tokens = new antlr4.CommonTokenStream(new Lexer(new antlr4.InputStream(expression)));
        const parser = new Parser(tokens);
        parser.buildParseTrees = true;
        const tree = parser.program();
        return new Visitor(context).visitProgram(tree);
    }
};