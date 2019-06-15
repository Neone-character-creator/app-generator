/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 by Bart Kiers (original author) and Alexandre Vitorelli (contributor -> ported to CSharp)
 * Copyright (c) 2017 by Ivan Kochurkin (Positive Technologies):
    added ECMAScript 6 support, cleared and transformed to the universal grammar.
 * Copyright (c) 2018 by Juan Alvarez (contributor -> ported to Go)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
grammar ScriptParser;

STRING_LITERAL: [a-zA-Z]+;
NUMBER_LITERAL: [0-9] |
    [0-9]+'.'[0-9]+;
PLUS_LITERAL: '+';
MULTIPLY_LITERAL: '*';
DIVIDE_LITERAL: '/';
SUBTRACT_LITERAL: '-';

CONTEXT_STATE_PREFIX : '$state';
CONTEXT_MODEL_PREFIX: '$model';

program: expression_sequence;

context_reference_prefix: CONTEXT_MODEL_PREFIX | CONTEXT_STATE_PREFIX;
literal_expression: STRING_LITERAL | numeric_expression;
context_reference_path: STRING_LITERAL |
    STRING_LITERAL '.' context_reference_path+ |
    STRING_LITERAL '[' STRING_LITERAL ']';
context_reference_expression:
    context_reference_prefix '.' context_reference_path |
    context_reference_expression '[' expression ']';
numeric_expression: NUMBER_LITERAL;
expression: literal_expression |
    expression PLUS_LITERAL expression |
    expression DIVIDE_LITERAL expression |
    expression SUBTRACT_LITERAL expression |
    numeric_expression MULTIPLY_LITERAL numeric_expression |
    context_reference_expression;

expression_sequence: expression |
    expression ';' expression_sequence;