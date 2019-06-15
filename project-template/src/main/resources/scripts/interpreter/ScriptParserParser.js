// Generated from scripting/ScriptParser.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var ScriptParserVisitor = require('./ScriptParserVisitor').ScriptParserVisitor;

var grammarFileName = "ScriptParser.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u000eX\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003",
    "\u0004\u0003\u0004\u0005\u0004\u0019\n\u0004\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0006\u0005\u001f\n\u0005\r\u0005\u000e\u0005",
    " \u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u0005\'\n\u0005",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0007\u00063\n\u0006",
    "\f\u0006\u000e\u00066\u000b\u0006\u0003\u0007\u0003\u0007\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0005\bA\n\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0007\bL",
    "\n\b\f\b\u000e\bO\u000b\b\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0005",
    "\tV\n\t\u0003\t\u0002\u0004\n\u000e\n\u0002\u0004\u0006\b\n\f\u000e",
    "\u0010\u0002\u0003\u0003\u0002\r\u000e\u0002Z\u0002\u0012\u0003\u0002",
    "\u0002\u0002\u0004\u0014\u0003\u0002\u0002\u0002\u0006\u0018\u0003\u0002",
    "\u0002\u0002\b&\u0003\u0002\u0002\u0002\n(\u0003\u0002\u0002\u0002\f",
    "7\u0003\u0002\u0002\u0002\u000e@\u0003\u0002\u0002\u0002\u0010U\u0003",
    "\u0002\u0002\u0002\u0012\u0013\u0005\u0010\t\u0002\u0013\u0003\u0003",
    "\u0002\u0002\u0002\u0014\u0015\t\u0002\u0002\u0002\u0015\u0005\u0003",
    "\u0002\u0002\u0002\u0016\u0019\u0007\u0007\u0002\u0002\u0017\u0019\u0005",
    "\f\u0007\u0002\u0018\u0016\u0003\u0002\u0002\u0002\u0018\u0017\u0003",
    "\u0002\u0002\u0002\u0019\u0007\u0003\u0002\u0002\u0002\u001a\'\u0007",
    "\u0007\u0002\u0002\u001b\u001c\u0007\u0007\u0002\u0002\u001c\u001e\u0007",
    "\u0003\u0002\u0002\u001d\u001f\u0005\b\u0005\u0002\u001e\u001d\u0003",
    "\u0002\u0002\u0002\u001f \u0003\u0002\u0002\u0002 \u001e\u0003\u0002",
    "\u0002\u0002 !\u0003\u0002\u0002\u0002!\'\u0003\u0002\u0002\u0002\"",
    "#\u0007\u0007\u0002\u0002#$\u0007\u0004\u0002\u0002$%\u0007\u0007\u0002",
    "\u0002%\'\u0007\u0005\u0002\u0002&\u001a\u0003\u0002\u0002\u0002&\u001b",
    "\u0003\u0002\u0002\u0002&\"\u0003\u0002\u0002\u0002\'\t\u0003\u0002",
    "\u0002\u0002()\b\u0006\u0001\u0002)*\u0005\u0004\u0003\u0002*+\u0007",
    "\u0003\u0002\u0002+,\u0005\b\u0005\u0002,4\u0003\u0002\u0002\u0002-",
    ".\f\u0003\u0002\u0002./\u0007\u0004\u0002\u0002/0\u0005\u000e\b\u0002",
    "01\u0007\u0005\u0002\u000213\u0003\u0002\u0002\u00022-\u0003\u0002\u0002",
    "\u000236\u0003\u0002\u0002\u000242\u0003\u0002\u0002\u000245\u0003\u0002",
    "\u0002\u00025\u000b\u0003\u0002\u0002\u000264\u0003\u0002\u0002\u0002",
    "78\u0007\b\u0002\u00028\r\u0003\u0002\u0002\u00029:\b\b\u0001\u0002",
    ":A\u0005\u0006\u0004\u0002;<\u0005\f\u0007\u0002<=\u0007\n\u0002\u0002",
    "=>\u0005\f\u0007\u0002>A\u0003\u0002\u0002\u0002?A\u0005\n\u0006\u0002",
    "@9\u0003\u0002\u0002\u0002@;\u0003\u0002\u0002\u0002@?\u0003\u0002\u0002",
    "\u0002AM\u0003\u0002\u0002\u0002BC\f\u0007\u0002\u0002CD\u0007\t\u0002",
    "\u0002DL\u0005\u000e\b\bEF\f\u0006\u0002\u0002FG\u0007\u000b\u0002\u0002",
    "GL\u0005\u000e\b\u0007HI\f\u0005\u0002\u0002IJ\u0007\f\u0002\u0002J",
    "L\u0005\u000e\b\u0006KB\u0003\u0002\u0002\u0002KE\u0003\u0002\u0002",
    "\u0002KH\u0003\u0002\u0002\u0002LO\u0003\u0002\u0002\u0002MK\u0003\u0002",
    "\u0002\u0002MN\u0003\u0002\u0002\u0002N\u000f\u0003\u0002\u0002\u0002",
    "OM\u0003\u0002\u0002\u0002PV\u0005\u000e\b\u0002QR\u0005\u000e\b\u0002",
    "RS\u0007\u0006\u0002\u0002ST\u0005\u0010\t\u0002TV\u0003\u0002\u0002",
    "\u0002UP\u0003\u0002\u0002\u0002UQ\u0003\u0002\u0002\u0002V\u0011\u0003",
    "\u0002\u0002\u0002\n\u0018 &4@KMU"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'.'", "'['", "']'", "';'", null, null, "'+'", 
                     "'*'", "'/'", "'-'", "'$state'", "'$model'" ];

var symbolicNames = [ null, null, null, null, null, "STRING_LITERAL", "NUMBER_LITERAL", 
                      "PLUS_LITERAL", "MULTIPLY_LITERAL", "DIVIDE_LITERAL", 
                      "SUBTRACT_LITERAL", "CONTEXT_STATE_PREFIX", "CONTEXT_MODEL_PREFIX" ];

var ruleNames =  [ "program", "context_reference_prefix", "literal_expression", 
                   "context_reference_path", "context_reference_expression", 
                   "numeric_expression", "expression", "expression_sequence" ];

function ScriptParserParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

ScriptParserParser.prototype = Object.create(antlr4.Parser.prototype);
ScriptParserParser.prototype.constructor = ScriptParserParser;

Object.defineProperty(ScriptParserParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

ScriptParserParser.EOF = antlr4.Token.EOF;
ScriptParserParser.T__0 = 1;
ScriptParserParser.T__1 = 2;
ScriptParserParser.T__2 = 3;
ScriptParserParser.T__3 = 4;
ScriptParserParser.STRING_LITERAL = 5;
ScriptParserParser.NUMBER_LITERAL = 6;
ScriptParserParser.PLUS_LITERAL = 7;
ScriptParserParser.MULTIPLY_LITERAL = 8;
ScriptParserParser.DIVIDE_LITERAL = 9;
ScriptParserParser.SUBTRACT_LITERAL = 10;
ScriptParserParser.CONTEXT_STATE_PREFIX = 11;
ScriptParserParser.CONTEXT_MODEL_PREFIX = 12;

ScriptParserParser.RULE_program = 0;
ScriptParserParser.RULE_context_reference_prefix = 1;
ScriptParserParser.RULE_literal_expression = 2;
ScriptParserParser.RULE_context_reference_path = 3;
ScriptParserParser.RULE_context_reference_expression = 4;
ScriptParserParser.RULE_numeric_expression = 5;
ScriptParserParser.RULE_expression = 6;
ScriptParserParser.RULE_expression_sequence = 7;

function ProgramContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ScriptParserParser.RULE_program;
    return this;
}

ProgramContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ProgramContext.prototype.constructor = ProgramContext;

ProgramContext.prototype.expression_sequence = function() {
    return this.getTypedRuleContext(Expression_sequenceContext,0);
};

ProgramContext.prototype.accept = function(visitor) {
    if ( visitor instanceof ScriptParserVisitor ) {
        return visitor.visitProgram(this);
    } else {
        return visitor.visitChildren(this);
    }
};




ScriptParserParser.ProgramContext = ProgramContext;

ScriptParserParser.prototype.program = function() {

    var localctx = new ProgramContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, ScriptParserParser.RULE_program);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 16;
        this.expression_sequence();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Context_reference_prefixContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ScriptParserParser.RULE_context_reference_prefix;
    return this;
}

Context_reference_prefixContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Context_reference_prefixContext.prototype.constructor = Context_reference_prefixContext;

Context_reference_prefixContext.prototype.CONTEXT_MODEL_PREFIX = function() {
    return this.getToken(ScriptParserParser.CONTEXT_MODEL_PREFIX, 0);
};

Context_reference_prefixContext.prototype.CONTEXT_STATE_PREFIX = function() {
    return this.getToken(ScriptParserParser.CONTEXT_STATE_PREFIX, 0);
};

Context_reference_prefixContext.prototype.accept = function(visitor) {
    if ( visitor instanceof ScriptParserVisitor ) {
        return visitor.visitContext_reference_prefix(this);
    } else {
        return visitor.visitChildren(this);
    }
};




ScriptParserParser.Context_reference_prefixContext = Context_reference_prefixContext;

ScriptParserParser.prototype.context_reference_prefix = function() {

    var localctx = new Context_reference_prefixContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, ScriptParserParser.RULE_context_reference_prefix);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 18;
        _la = this._input.LA(1);
        if(!(_la===ScriptParserParser.CONTEXT_STATE_PREFIX || _la===ScriptParserParser.CONTEXT_MODEL_PREFIX)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Literal_expressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ScriptParserParser.RULE_literal_expression;
    return this;
}

Literal_expressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Literal_expressionContext.prototype.constructor = Literal_expressionContext;

Literal_expressionContext.prototype.STRING_LITERAL = function() {
    return this.getToken(ScriptParserParser.STRING_LITERAL, 0);
};

Literal_expressionContext.prototype.numeric_expression = function() {
    return this.getTypedRuleContext(Numeric_expressionContext,0);
};

Literal_expressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof ScriptParserVisitor ) {
        return visitor.visitLiteral_expression(this);
    } else {
        return visitor.visitChildren(this);
    }
};




ScriptParserParser.Literal_expressionContext = Literal_expressionContext;

ScriptParserParser.prototype.literal_expression = function() {

    var localctx = new Literal_expressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, ScriptParserParser.RULE_literal_expression);
    try {
        this.state = 22;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case ScriptParserParser.STRING_LITERAL:
            this.enterOuterAlt(localctx, 1);
            this.state = 20;
            this.match(ScriptParserParser.STRING_LITERAL);
            break;
        case ScriptParserParser.NUMBER_LITERAL:
            this.enterOuterAlt(localctx, 2);
            this.state = 21;
            this.numeric_expression();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Context_reference_pathContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ScriptParserParser.RULE_context_reference_path;
    return this;
}

Context_reference_pathContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Context_reference_pathContext.prototype.constructor = Context_reference_pathContext;

Context_reference_pathContext.prototype.STRING_LITERAL = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(ScriptParserParser.STRING_LITERAL);
    } else {
        return this.getToken(ScriptParserParser.STRING_LITERAL, i);
    }
};


Context_reference_pathContext.prototype.context_reference_path = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(Context_reference_pathContext);
    } else {
        return this.getTypedRuleContext(Context_reference_pathContext,i);
    }
};

Context_reference_pathContext.prototype.accept = function(visitor) {
    if ( visitor instanceof ScriptParserVisitor ) {
        return visitor.visitContext_reference_path(this);
    } else {
        return visitor.visitChildren(this);
    }
};




ScriptParserParser.Context_reference_pathContext = Context_reference_pathContext;

ScriptParserParser.prototype.context_reference_path = function() {

    var localctx = new Context_reference_pathContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, ScriptParserParser.RULE_context_reference_path);
    try {
        this.state = 36;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 24;
            this.match(ScriptParserParser.STRING_LITERAL);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 25;
            this.match(ScriptParserParser.STRING_LITERAL);
            this.state = 26;
            this.match(ScriptParserParser.T__0);
            this.state = 28; 
            this._errHandler.sync(this);
            var _alt = 1;
            do {
            	switch (_alt) {
            	case 1:
            		this.state = 27;
            		this.context_reference_path();
            		break;
            	default:
            		throw new antlr4.error.NoViableAltException(this);
            	}
            	this.state = 30; 
            	this._errHandler.sync(this);
            	_alt = this._interp.adaptivePredict(this._input,1, this._ctx);
            } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 32;
            this.match(ScriptParserParser.STRING_LITERAL);
            this.state = 33;
            this.match(ScriptParserParser.T__1);
            this.state = 34;
            this.match(ScriptParserParser.STRING_LITERAL);
            this.state = 35;
            this.match(ScriptParserParser.T__2);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function Context_reference_expressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ScriptParserParser.RULE_context_reference_expression;
    return this;
}

Context_reference_expressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Context_reference_expressionContext.prototype.constructor = Context_reference_expressionContext;

Context_reference_expressionContext.prototype.context_reference_prefix = function() {
    return this.getTypedRuleContext(Context_reference_prefixContext,0);
};

Context_reference_expressionContext.prototype.context_reference_path = function() {
    return this.getTypedRuleContext(Context_reference_pathContext,0);
};

Context_reference_expressionContext.prototype.context_reference_expression = function() {
    return this.getTypedRuleContext(Context_reference_expressionContext,0);
};

Context_reference_expressionContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

Context_reference_expressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof ScriptParserVisitor ) {
        return visitor.visitContext_reference_expression(this);
    } else {
        return visitor.visitChildren(this);
    }
};



ScriptParserParser.prototype.context_reference_expression = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new Context_reference_expressionContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 8;
    this.enterRecursionRule(localctx, 8, ScriptParserParser.RULE_context_reference_expression, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 39;
        this.context_reference_prefix();
        this.state = 40;
        this.match(ScriptParserParser.T__0);
        this.state = 41;
        this.context_reference_path();
        this._ctx.stop = this._input.LT(-1);
        this.state = 50;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                localctx = new Context_reference_expressionContext(this, _parentctx, _parentState);
                this.pushNewRecursionContext(localctx, _startState, ScriptParserParser.RULE_context_reference_expression);
                this.state = 43;
                if (!( this.precpred(this._ctx, 1))) {
                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                }
                this.state = 44;
                this.match(ScriptParserParser.T__1);
                this.state = 45;
                this.expression(0);
                this.state = 46;
                this.match(ScriptParserParser.T__2); 
            }
            this.state = 52;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};

function Numeric_expressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ScriptParserParser.RULE_numeric_expression;
    return this;
}

Numeric_expressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Numeric_expressionContext.prototype.constructor = Numeric_expressionContext;

Numeric_expressionContext.prototype.NUMBER_LITERAL = function() {
    return this.getToken(ScriptParserParser.NUMBER_LITERAL, 0);
};

Numeric_expressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof ScriptParserVisitor ) {
        return visitor.visitNumeric_expression(this);
    } else {
        return visitor.visitChildren(this);
    }
};




ScriptParserParser.Numeric_expressionContext = Numeric_expressionContext;

ScriptParserParser.prototype.numeric_expression = function() {

    var localctx = new Numeric_expressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, ScriptParserParser.RULE_numeric_expression);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 53;
        this.match(ScriptParserParser.NUMBER_LITERAL);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ScriptParserParser.RULE_expression;
    return this;
}

ExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;

ExpressionContext.prototype.literal_expression = function() {
    return this.getTypedRuleContext(Literal_expressionContext,0);
};

ExpressionContext.prototype.numeric_expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(Numeric_expressionContext);
    } else {
        return this.getTypedRuleContext(Numeric_expressionContext,i);
    }
};

ExpressionContext.prototype.MULTIPLY_LITERAL = function() {
    return this.getToken(ScriptParserParser.MULTIPLY_LITERAL, 0);
};

ExpressionContext.prototype.context_reference_expression = function() {
    return this.getTypedRuleContext(Context_reference_expressionContext,0);
};

ExpressionContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

ExpressionContext.prototype.PLUS_LITERAL = function() {
    return this.getToken(ScriptParserParser.PLUS_LITERAL, 0);
};

ExpressionContext.prototype.DIVIDE_LITERAL = function() {
    return this.getToken(ScriptParserParser.DIVIDE_LITERAL, 0);
};

ExpressionContext.prototype.SUBTRACT_LITERAL = function() {
    return this.getToken(ScriptParserParser.SUBTRACT_LITERAL, 0);
};

ExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof ScriptParserVisitor ) {
        return visitor.visitExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};



ScriptParserParser.prototype.expression = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExpressionContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 12;
    this.enterRecursionRule(localctx, 12, ScriptParserParser.RULE_expression, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 62;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
        switch(la_) {
        case 1:
            this.state = 56;
            this.literal_expression();
            break;

        case 2:
            this.state = 57;
            this.numeric_expression();
            this.state = 58;
            this.match(ScriptParserParser.MULTIPLY_LITERAL);
            this.state = 59;
            this.numeric_expression();
            break;

        case 3:
            this.state = 61;
            this.context_reference_expression(0);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 75;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,6,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 73;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, ScriptParserParser.RULE_expression);
                    this.state = 64;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 65;
                    this.match(ScriptParserParser.PLUS_LITERAL);
                    this.state = 66;
                    this.expression(6);
                    break;

                case 2:
                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, ScriptParserParser.RULE_expression);
                    this.state = 67;
                    if (!( this.precpred(this._ctx, 4))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                    }
                    this.state = 68;
                    this.match(ScriptParserParser.DIVIDE_LITERAL);
                    this.state = 69;
                    this.expression(5);
                    break;

                case 3:
                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, ScriptParserParser.RULE_expression);
                    this.state = 70;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 71;
                    this.match(ScriptParserParser.SUBTRACT_LITERAL);
                    this.state = 72;
                    this.expression(4);
                    break;

                } 
            }
            this.state = 77;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,6,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};

function Expression_sequenceContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ScriptParserParser.RULE_expression_sequence;
    return this;
}

Expression_sequenceContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Expression_sequenceContext.prototype.constructor = Expression_sequenceContext;

Expression_sequenceContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

Expression_sequenceContext.prototype.expression_sequence = function() {
    return this.getTypedRuleContext(Expression_sequenceContext,0);
};

Expression_sequenceContext.prototype.accept = function(visitor) {
    if ( visitor instanceof ScriptParserVisitor ) {
        return visitor.visitExpression_sequence(this);
    } else {
        return visitor.visitChildren(this);
    }
};




ScriptParserParser.Expression_sequenceContext = Expression_sequenceContext;

ScriptParserParser.prototype.expression_sequence = function() {

    var localctx = new Expression_sequenceContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, ScriptParserParser.RULE_expression_sequence);
    try {
        this.state = 83;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 78;
            this.expression(0);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 79;
            this.expression(0);
            this.state = 80;
            this.match(ScriptParserParser.T__3);
            this.state = 81;
            this.expression_sequence();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


ScriptParserParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 4:
			return this.context_reference_expression_sempred(localctx, predIndex);
	case 6:
			return this.expression_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

ScriptParserParser.prototype.context_reference_expression_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 1);
		default:
			throw "No predicate with index:" + predIndex;
	}
};

ScriptParserParser.prototype.expression_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 1:
			return this.precpred(this._ctx, 5);
		case 2:
			return this.precpred(this._ctx, 4);
		case 3:
			return this.precpred(this._ctx, 3);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.ScriptParserParser = ScriptParserParser;
