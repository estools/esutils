/*
Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import * as esutils from '../src/utils.js';

const EMPTY = {
    type: 'EmptyStatement'
};

describe('ast', function() {
    describe('isExpression', function() {
        it('returns false if input is not node', function() {
            expect(esutils.ast.isExpression(0)).to.be.false;
            expect(esutils.ast.isExpression(null)).to.be.false;
            expect(esutils.ast.isExpression(void 0)).to.be.false;
            expect(esutils.ast.isExpression({})).to.be.false;
            expect(esutils.ast.isExpression({
                type: null
            })).to.be.false;
            expect(esutils.ast.isExpression({
                type: void 0
            })).to.be.false;
        });

        it('returns true if provided node is expression', function() {
            expect(esutils.ast.isExpression({
                type: 'ArrayExpression'
            })).to.be.true;
            expect(esutils.ast.isExpression({
                type: 'ThisExpression'
            })).to.be.true;
            expect(esutils.ast.isExpression({
                type: 'Literal',
                value: 0
            })).to.be.true;
        });

        it('returns false if provided node is not expression', function() {
            expect(esutils.ast.isExpression({
                type: 'ExpressionStatement'
            })).to.be.false;

            expect(esutils.ast.isExpression({
                type: 'Program'
            })).to.be.false;
        });
    });
    describe('isIterationStatement', function() {
        it('returns false if input is not node', function() {
            expect(esutils.ast.isIterationStatement(0)).to.be.false;
            expect(esutils.ast.isIterationStatement(null)).to.be.false;
            expect(esutils.ast.isIterationStatement(void 0)).to.be.false;
            expect(esutils.ast.isIterationStatement({})).to.be.false;
            expect(esutils.ast.isIterationStatement({
                type: null
            })).to.be.false;
            expect(esutils.ast.isIterationStatement({
                type: void 0
            })).to.be.false;
        });
        it('returns true if provided node is iteration statement', function() {
            expect(esutils.ast.isIterationStatement({
                type: 'ForInStatement'
            })).to.be.true;
            expect(esutils.ast.isIterationStatement({
                type: 'DoWhileStatement'
            })).to.be.true;
        });
        it('returns false if provided node is not iteration statement', function() {
            expect(esutils.ast.isIterationStatement({
                type: 'ExpressionStatement'
            })).to.be.false;
            expect(esutils.ast.isIterationStatement({
                type: 'ThisExpression'
            })).to.be.false;
        });
    });
    describe('isStatement', function() {
        it('returns false if input is not node', function() {
            expect(esutils.ast.isStatement(0)).to.be.false;
            expect(esutils.ast.isStatement(null)).to.be.false;
            expect(esutils.ast.isStatement(void 0)).to.be.false;
            expect(esutils.ast.isStatement({})).to.be.false;
            expect(esutils.ast.isStatement({
                type: null
            })).to.be.false;
            expect(esutils.ast.isStatement({
                type: void 0
            })).to.be.false;
        });
        it('returns true if provided node is statement', function() {
            expect(esutils.ast.isStatement({
                type: 'BlockStatement'
            })).to.be.true;
            expect(esutils.ast.isStatement({
                type: 'ExpressionStatement'
            })).to.be.true;
            expect(esutils.ast.isStatement({
                type: 'WhileStatement'
            })).to.be.true;
        });
        it('returns false if provided node is not statement', function() {
            expect(esutils.ast.isStatement({
                type: 'ThisExpression'
            })).to.be.false;
            expect(esutils.ast.isStatement({
                type: 'FunctionDeclaration'
            })).to.be.false;
            expect(esutils.ast.isStatement({
                type: 'Program'
            })).to.be.false;
        });
    });
    describe('isSourceElement', function() {
        it('returns false if input is not node', function() {
            expect(esutils.ast.isSourceElement(0)).to.be.false;
            expect(esutils.ast.isSourceElement(null)).to.be.false;
            expect(esutils.ast.isSourceElement(void 0)).to.be.false;
            expect(esutils.ast.isSourceElement({})).to.be.false;
            expect(esutils.ast.isSourceElement({
                type: null
            })).to.be.false;
            expect(esutils.ast.isSourceElement({
                type: void 0
            })).to.be.false;
        });
        it('returns true if provided node is source element', function() {
            expect(esutils.ast.isSourceElement({
                type: 'ExpressionStatement'
            })).to.be.true;
            expect(esutils.ast.isSourceElement({
                type: 'WhileStatement'
            })).to.be.true;
            expect(esutils.ast.isSourceElement({
                type: 'FunctionDeclaration'
            })).to.be.true;
        });
        it('returns false if provided node is not source element', function() {
            expect(esutils.ast.isSourceElement({
                type: 'ThisExpression'
            })).to.be.false;
            expect(esutils.ast.isSourceElement({
                type: 'Program'
            })).to.be.false;
        });
    });
    describe('trailingStatement', function() {
        it('returns trailing statement if node has it', function() {
            expect(esutils.ast.trailingStatement({
                type: 'WhileStatement',
                body: EMPTY
            })).to.be.eq(EMPTY);
            expect(esutils.ast.trailingStatement({
                type: 'WithStatement',
                body: EMPTY
            })).to.be.eq(EMPTY);
            expect(esutils.ast.trailingStatement({
                type: 'ForStatement',
                body: EMPTY
            })).to.be.eq(EMPTY);
            expect(esutils.ast.trailingStatement({
                type: 'ForInStatement',
                body: EMPTY
            })).to.be.eq(EMPTY);
            expect(esutils.ast.trailingStatement({
                type: 'IfStatement',
                consequent: EMPTY
            })).to.be.eq(EMPTY);
            expect(esutils.ast.trailingStatement({
                type: 'IfStatement',
                consequent: {
                    type: 'EmptyStatement'
                },
                alternate: EMPTY
            })).to.be.eq(EMPTY);
            expect(esutils.ast.trailingStatement({
                type: 'LabeledStatement',
                body: EMPTY
            })).to.be.eq(EMPTY);
        });
        it('returns null if node doens\'t have trailing statement', function() {
            expect(esutils.ast.trailingStatement({
                type: 'DoWhileStatement',
                body: EMPTY
            })).to.be.null;
            expect(esutils.ast.trailingStatement({
                type: 'ReturnStatement'
            })).to.be.null;
        });
    });
    describe('isProblematicIfStatement', function() {
        it('returns true if node is problematic if statement', function() {
            expect(esutils.ast.isProblematicIfStatement({
                type: 'IfStatement',
                consequent: {
                    type: 'IfStatement',
                    consequent: EMPTY
                },
                alternate: EMPTY
            })).to.be.true;
            expect(esutils.ast.isProblematicIfStatement({
                type: 'IfStatement',
                consequent: {
                    type: 'LabeledStatement',
                    body: {
                        type: 'IfStatement',
                        consequent: EMPTY
                    }
                },
                alternate: EMPTY
            })).to.be.true;
            expect(esutils.ast.isProblematicIfStatement({
                type: 'IfStatement',
                consequent: {
                    type: 'WithStatement',
                    body: {
                        type: 'IfStatement',
                        consequent: EMPTY
                    }
                },
                alternate: EMPTY
            })).to.be.true;
        });
        it('returns false if node is not problematic if statement', function() {
            expect(esutils.ast.isProblematicIfStatement({
                type: 'ThisExpression'
            })).to.be.false;
            expect(esutils.ast.isProblematicIfStatement({
                type: 'IfStatement',
                consequent: EMPTY,
                alternate: EMPTY
            })).to.be.false;
            expect(esutils.ast.isProblematicIfStatement({
                type: 'IfStatement',
                consequent: {
                    type: 'IfStatement',
                    consequent: {
                        type: 'BlockStatement',
                        body: []
                    },
                    alternate: {
                        type: 'BlockStatement',
                        body: []
                    }
                },
                alternate: {
                    type: 'BlockStatement',
                    body: []
                }
            })).to.be.false;
            expect(esutils.ast.isProblematicIfStatement({
                type: 'IfStatement',
                consequent: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'IfStatement',
                            consequent: EMPTY
                        }
                    ]
                },
                alternate: null
            })).to.be.false;
            expect(esutils.ast.isProblematicIfStatement({
                type: 'IfStatement',
                consequent: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'IfStatement',
                            consequent: EMPTY
                        }
                    ]
                },
                alternate: EMPTY
            })).to.be.false;
            expect(esutils.ast.isProblematicIfStatement({
                type: 'IfStatement',
                consequent: {
                    type: 'DoWhileStatement',
                    body: {
                        type: 'IfStatement',
                        consequent: EMPTY
                    }
                },
                alternate: EMPTY
            })).to.be.false;
        });
    });
});
