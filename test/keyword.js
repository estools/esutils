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

const KW = ['if', 'in', 'do', 'var', 'for', 'new', 'try', 'this', 'else', 'case', 'void', 'with', 'enum', 'while', 'break', 'catch', 'throw', 'const', 'class', 'super', 'return', 'typeof', 'delete', 'switch', 'export', 'import', 'default', 'finally', 'extends', 'function', 'continue', 'debugger', 'instanceof'];

const SRW = ['implements', 'interface', 'package', 'private', 'protected', 'public', 'static', 'let'];

describe('keyword', function() {
    describe('isKeywordES6', function() {
        it('returns true if provided string is keyword under non-strict mode', function() {
            for (const word of KW) {
                expect(esutils.keyword.isKeywordES6(word, false)).to.be.true;
            }
            expect(esutils.keyword.isKeywordES6('yield', false)).to.be.true;
        });
        it('returns false if provided string is not keyword under non-strict mode', function() {
            const words = ['hello', '20', '$', 'ゆゆ式'];
            for (const word of words) {
                expect(esutils.keyword.isKeywordES6(word, false)).to.be.false;
            }
            const results = [];
            for (const word of SRW) {
                results.push(expect(esutils.keyword.isKeywordES6(word, false)).to.be.false);
            }
            return results;
        });
        it('returns true if provided string is keyword under strict mode', function() {
            for (const word of KW) {
                expect(esutils.keyword.isKeywordES6(word, true)).to.be.true;
            }
            expect(esutils.keyword.isKeywordES6('yield', true)).to.be.true;
            const results = [];
            for (const word of SRW) {
                results.push(expect(esutils.keyword.isKeywordES6(word, true)).to.be.true);
            }
            return results;
        });
        it('returns false if provided string is not keyword under strict mode', function() {
            const words = ['hello', '20', '$', 'ゆゆ式'];
            const results = [];
            for (const word of words) {
                results.push(expect(esutils.keyword.isKeywordES6(word, true)).to.be.false);
            }
            return results;
        });
    });
    describe('isKeywordES5', function() {
        it('returns true if provided string is keyword under non-strict mode', function() {
            const results = [];
            for (const word of KW) {
                results.push(expect(esutils.keyword.isKeywordES5(word, false)).to.be.true);
            }
            return results;
        });
        it('returns false if provided string is not keyword under non-strict mode', function() {
            const words = ['hello', '20', '$', 'ゆゆ式'];
            for (const word of words) {
                expect(esutils.keyword.isKeywordES5(word, false)).to.be.false;
            }
            for (const word of SRW) {
                expect(esutils.keyword.isKeywordES5(word, false)).to.be.false;
            }
            expect(esutils.keyword.isKeywordES5('yield', false)).to.be.false;
        });
        it('returns true if provided string is keyword under strict mode', function() {
            for (const word of KW) {
                expect(esutils.keyword.isKeywordES5(word, true)).to.be.true;
            }
            expect(esutils.keyword.isKeywordES5('yield', true)).to.be.true;
            const results = [];
            for (const word of SRW) {
                results.push(expect(esutils.keyword.isKeywordES5(word, true)).to.be.true);
            }
            return results;
        });

        it('returns false if provided string is not keyword under strict mode', function() {
            const words = ['hello', '20', '$', 'ゆゆ式'];
            const results = [];
            for (const word of words) {
                results.push(expect(esutils.keyword.isKeywordES5(word, true)).to.be.false);
            }
            return results;
        });
    });
    describe('isReservedWordES6', function() {
        it('returns true for null/boolean values', function() {
            expect(esutils.keyword.isReservedWordES6('null', false)).to.be.true;
            expect(esutils.keyword.isReservedWordES6('null', true)).to.be.true;
            expect(esutils.keyword.isReservedWordES6('true', false)).to.be.true;
            expect(esutils.keyword.isReservedWordES6('true', true)).to.be.true;
            expect(esutils.keyword.isReservedWordES6('false', false)).to.be.true;
            expect(esutils.keyword.isReservedWordES6('false', true)).to.be.true;
        });
        // isReservedWordES6 has the same properties as isKeywordES6
        it('returns true if provided string is keyword under non-strict mode', function() {
            for (const word of KW) {
                expect(esutils.keyword.isReservedWordES6(word, false)).to.be.true;
            }
            expect(esutils.keyword.isReservedWordES6('yield', false)).to.be.true;
        });
        it('returns false if provided string is not keyword under non-strict mode', function() {
            const words = ['hello', '20', '$', 'ゆゆ式'];
            for (const word of words) {
                expect(esutils.keyword.isReservedWordES6(word, false)).to.be.false;
            }
            const results = [];
            for (const word of SRW) {
                results.push(expect(esutils.keyword.isReservedWordES6(word, false)).to.be.false);
            }
            return results;
        });
        it('returns true if provided string is keyword under strict mode', function() {
            for (const word of KW) {
                expect(esutils.keyword.isReservedWordES6(word, true)).to.be.true;
            }
            expect(esutils.keyword.isReservedWordES6('yield', true)).to.be.true;
            const results = [];
            for (const word of SRW) {
                results.push(expect(esutils.keyword.isReservedWordES6(word, true)).to.be.true);
            }
            return results;
        });
        it('returns false if provided string is not keyword under strict mode', function() {
            const words = ['hello', '20', '$', 'ゆゆ式'];
            const results = [];
            for (const word of words) {
                results.push(expect(esutils.keyword.isReservedWordES6(word, true)).to.be.false);
            }
            return results;
        });
    });
    describe('isReservedWordES5', function() {
        it('returns true for null/boolean values', function() {
            expect(esutils.keyword.isReservedWordES5('null', false)).to.be.true;
            expect(esutils.keyword.isReservedWordES5('null', true)).to.be.true;
            expect(esutils.keyword.isReservedWordES5('true', false)).to.be.true;
            expect(esutils.keyword.isReservedWordES5('true', true)).to.be.true;
            expect(esutils.keyword.isReservedWordES5('false', false)).to.be.true;
            expect(esutils.keyword.isReservedWordES5('false', true)).to.be.true;
        });
        // isReservedWordES5 has the same properties as isKeywordES5
        it('returns true if provided string is keyword under non-strict mode', function() {
            const results = [];
            for (const word of KW) {
                results.push(expect(esutils.keyword.isReservedWordES5(word, false)).to.be.true);
            }
            return results;
        });
        it('returns false if provided string is not keyword under non-strict mode', function() {
            const words = ['hello', '20', '$', 'ゆゆ式'];
            for (const word of words) {
                expect(esutils.keyword.isReservedWordES5(word, false)).to.be.false;
            }
            for (const word of SRW) {
                expect(esutils.keyword.isReservedWordES5(word, false)).to.be.false;
            }
            expect(esutils.keyword.isReservedWordES5('yield', false)).to.be.false;
        });

        it('returns true if provided string is keyword under strict mode', function() {
            for (const word of KW) {
                expect(esutils.keyword.isReservedWordES5(word, true)).to.be.true;
            }
            expect(esutils.keyword.isReservedWordES5('yield', true)).to.be.true;
            const results = [];
            for (const word of SRW) {
                results.push(expect(esutils.keyword.isReservedWordES5(word, true)).to.be.true);
            }
            return results;
        });

        it('returns false if provided string is not keyword under strict mode', function() {
            const words = ['hello', '20', '$', 'ゆゆ式'];
            const results = [];
            for (const word of words) {
                results.push(expect(esutils.keyword.isReservedWordES5(word, true)).to.be.false);
            }
            return results;
        });
    });
    describe('isRestrictedWord', function() {
        it('returns true if provided string is "eval" or "arguments"', function() {
            expect(esutils.keyword.isRestrictedWord('eval')).to.be.true;
            expect(esutils.keyword.isRestrictedWord('arguments')).to.be.true;
        });

        it('returns false if provided string is not "eval" or "arguments"', function() {
            const words = ['hello', '20', '$', 'ゆゆ式'];
            const results = [];
            for (const word of words) {
                results.push(expect(esutils.keyword.isRestrictedWord(word)).to.be.false);
            }
            return results;
        });
    });
    describe('isIdentifierName', function() {
        it('returns false if provided string is empty', function() {
            expect(esutils.keyword.isIdentifierNameES5('')).to.be.false;
            expect(esutils.keyword.isIdentifierNameES6('')).to.be.false;
        });
        it('returns true if provided string is IdentifierName', function() {
            const words = ['hello', '$', 'ゆゆ式', '$20', 'hello20', '_', 'if'];
            const results = [];
            for (const word of words) {
                expect(esutils.keyword.isIdentifierNameES5(word)).to.be.true;
                results.push(expect(esutils.keyword.isIdentifierNameES6(word)).to.be.true);
            }
            return results;
        });
        it('returns false if provided string is not IdentifierName', function() {
            const words = ['+hello', '0$', '-ゆゆ式', '#_', '_#'];
            const results = [];
            for (const word of words) {
                expect(esutils.keyword.isIdentifierNameES5(word)).to.be.false;
                results.push(expect(esutils.keyword.isIdentifierNameES6(word)).to.be.false);
            }
            return results;
        });
        it('returns false if provided an unmatched high surrogate', function () {
            const words = ['\uD800a', '\uD800'];
            const results = [];
            for (const word of words) {
                expect(esutils.keyword.isIdentifierNameES5(word)).to.be.false;
                results.push(expect(esutils.keyword.isIdentifierNameES6(word)).to.be.false);
            }
            return results;
        });
        it('supports astral symbols', function() {
            expect(esutils.keyword.isIdentifierNameES6('x\uDB40\uDDD5')).to.be.true;
        });
    });
    describe('isIdentifierES5', function() {
        it('returns false if provided string is empty', function() {
            expect(esutils.keyword.isIdentifierES5('')).to.be.false;
        });
        it('returns true if provided string is Identifier', function() {
            const words = ['hello', '$', 'ゆゆ式', '$20', 'hello20', '_'];
            for (const word of words) {
                expect(esutils.keyword.isIdentifierES5(word)).to.be.true;
            }
            expect(esutils.keyword.isIdentifierES5('yield', false)).to.be.true;
            expect(esutils.keyword.isIdentifierES5('let', false)).to.be.true;
        });
        it('returns false if provided string is not Identifier', function() {
            const words = ['+hello', '0$', '-ゆゆ式', '#_', '_#', 'if', 'null', 'true', 'false'];
            for (const word of words) {
                expect(esutils.keyword.isIdentifierES5(word)).to.be.false;
            }
            expect(esutils.keyword.isIdentifierES5('yield', true)).to.be.false;
            expect(esutils.keyword.isIdentifierES5('let', true)).to.be.false;
        });
    });
    describe('isIdentifierES6', function() {
        it('returns false if provided string is empty', function() {
            expect(esutils.keyword.isIdentifierES6('')).to.be.false;
        });
        it('returns true if provided string is Identifier', function() {
            const words = ['hello', '$', 'ゆゆ式', '$20', 'hello20', '_'];
            for (const word of words) {
                expect(esutils.keyword.isIdentifierES6(word)).to.be.true;
            }
            expect(esutils.keyword.isIdentifierES6('let', false)).to.be.true;
        });
        it('returns false if provided string is not Identifier', function() {
            const words = ['+hello', '0$', '-ゆゆ式', '#_', '_#', 'if', 'null', 'true', 'false'];
            for (const word of words) {
                expect(esutils.keyword.isIdentifierES6(word)).to.be.false;
            }
            expect(esutils.keyword.isIdentifierES6('yield', false)).to.be.false;
            expect(esutils.keyword.isIdentifierES6('yield', true)).to.be.false;
            expect(esutils.keyword.isIdentifierES6('let', true)).to.be.false;
        });
    });
});
