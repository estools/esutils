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

describe('code', function() {
    describe('isDecimalDigit', function() {
        it('returns true if provided code is decimal digit', function() {
            const results = [];
            for (let ch = 0, i = 0; i <= 9; ch = ++i) {
                results.push(expect(esutils.code.isDecimalDigit((String(ch)).charCodeAt(0))).to.be.true);
            }
            return results;
        });

        it('returns false if provided code is not decimal digit', function() {
            let code, i, ref, ref1;
            for (code = i = ref = 'a'.charCodeAt(0), ref1 = 'z'.charCodeAt(0); (ref <= ref1 ? i <= ref1 : i >= ref1); code = ref <= ref1 ? ++i : --i) {
                expect(esutils.code.isDecimalDigit(code)).to.be.false;
            }
            const results = [];

            let j, ref2, ref3;
            for (code = j = ref2 = 'A'.charCodeAt(0), ref3 = 'Z'.charCodeAt(0); (ref2 <= ref3 ? j <= ref3 : j >= ref3); code = ref2 <= ref3 ? ++j : --j) {
                results.push(expect(esutils.code.isDecimalDigit(code)).to.be.false);
            }
            return results;
        });
    });
    describe('isHexDigit', function() {
        it('returns true if provided code is hexadecimal digit', function() {
            for (let ch = 0, i = 0; i <= 9; ch = ++i) {
                expect(esutils.code.isHexDigit((String(ch)).charCodeAt(0))).to.be.true;
            }
            let j, ref, ref1, code;
            for (code = j = ref = 'a'.charCodeAt(0), ref1 = 'f'.charCodeAt(0); (ref <= ref1 ? j <= ref1 : j >= ref1); code = ref <= ref1 ? ++j : --j) {
                expect(esutils.code.isHexDigit(code)).to.be.true;
            }
            const results = [];
            let k, ref2, ref3;
            for (code = k = ref2 = 'A'.charCodeAt(0), ref3 = 'F'.charCodeAt(0); (ref2 <= ref3 ? k <= ref3 : k >= ref3); code = ref2 <= ref3 ? ++k : --k) {
                results.push(expect(esutils.code.isHexDigit(code)).to.be.true);
            }
            return results;
        });

        it('returns false if provided code is not hexadecimal digit', function() {
            let code, i, ref, ref1;
            for (code = i = ref = 'g'.charCodeAt(0), ref1 = 'z'.charCodeAt(0); (ref <= ref1 ? i <= ref1 : i >= ref1); code = ref <= ref1 ? ++i : --i) {
                expect(esutils.code.isHexDigit(code)).to.be.false;
            }
            const results = [];
            let j, ref2, ref3;
            for (code = j = ref2 = 'G'.charCodeAt(0), ref3 = 'Z'.charCodeAt(0); (ref2 <= ref3 ? j <= ref3 : j >= ref3); code = ref2 <= ref3 ? ++j : --j) {
                results.push(expect(esutils.code.isHexDigit(code)).to.be.false);
            }
            return results;
        });
    });
    describe('isOctalDigit', function() {
        it('returns true if provided code is octal digit', function() {
            const results = [];
            for (let ch = 0, i = 0; i <= 7; ch = ++i) {
                results.push(expect(esutils.code.isOctalDigit((String(ch)).charCodeAt(0))).to.be.true);
            }
            return results;
        });

        it('returns false if provided code is not octal digit', function() {
            for (let ch = 8, i = 8; i <= 9; ch = ++i) {
                expect(esutils.code.isOctalDigit((String(ch)).charCodeAt(0))).to.be.false;
            }
            let code, j, ref, ref1;
            for (code = j = ref = 'a'.charCodeAt(0), ref1 = 'z'.charCodeAt(0); (ref <= ref1 ? j <= ref1 : j >= ref1); code = ref <= ref1 ? ++j : --j) {
                expect(esutils.code.isOctalDigit(code)).to.be.false;
            }
            const results = [];
            let k, ref2, ref3;
            for (code = k = ref2 = 'A'.charCodeAt(0), ref3 = 'Z'.charCodeAt(0); (ref2 <= ref3 ? k <= ref3 : k >= ref3); code = ref2 <= ref3 ? ++k : --k) {
                results.push(expect(esutils.code.isOctalDigit(code)).to.be.false);
            }
            return results;
        });
    });
    describe('isWhiteSpace', function() {
        it('returns true if provided code is white space', function() {
            const codes = [
                0x0009, // TAB
                0x000B, // VT
                0x000C, // FF
                0x0020, // SP
                0x00A0, // NBSP
                0xFEFF, // BOM

                // Zs
                0x1680,
                0x2000,
                0x2001,
                0x2002,
                0x2003,
                0x2004,
                0x2005,
                0x2006,
                0x2007,
                0x2008,
                0x2009,
                0x200A,
                0x202F,
                0x205F,
                0x3000
            ];
            for (const code of codes) {
                expect(esutils.code.isWhiteSpace(code)).to.be.true;
            }
            expect(esutils.code.isWhiteSpace(0x180E)).to.be.false;
        });

        it('returns false if provided code is not white space', function() {
            for (let ch = 0, i = 0; i <= 9; ch = ++i) {
                expect(esutils.code.isWhiteSpace((String(ch)).charCodeAt(0))).to.be.false;
            }
            let code, j, ref, ref1;
            for (code = j = ref = 'a'.charCodeAt(0), ref1 = 'z'.charCodeAt(0); (ref <= ref1 ? j <= ref1 : j >= ref1); code = ref <= ref1 ? ++j : --j) {
                expect(esutils.code.isWhiteSpace(code)).to.be.false;
            }
            const results = [];
            let k, ref2, ref3;
            for (code = k = ref2 = 'A'.charCodeAt(0), ref3 = 'Z'.charCodeAt(0); (ref2 <= ref3 ? k <= ref3 : k >= ref3); code = ref2 <= ref3 ? ++k : --k) {
                results.push(expect(esutils.code.isWhiteSpace(code)).to.be.false);
            }
            return results;
        });
    });
    describe('isLineTerminator', function() {
        it('returns true if provided code is line terminator', function() {
            const codes = [0x000A, 0x000D, 0x2028, 0x2029];
            const results = [];
            for (const code of codes) {
                results.push(expect(esutils.code.isLineTerminator(code)).to.be.true);
            }
            return results;
        });

        it('returns false if provided code is not line terminator', function() {
            for (let ch = 0, i = 0; i <= 9; ch = ++i) {
                expect(esutils.code.isLineTerminator((String(ch)).charCodeAt(0))).to.be.false;
            }
            let code, j, ref, ref1;
            for (code = j = ref = 'a'.charCodeAt(0), ref1 = 'z'.charCodeAt(0); (ref <= ref1 ? j <= ref1 : j >= ref1); code = ref <= ref1 ? ++j : --j) {
                expect(esutils.code.isLineTerminator(code)).to.be.false;
            }
            const results = [];
            let k, ref2, ref3;
            for (code = k = ref2 = 'A'.charCodeAt(0), ref3 = 'Z'.charCodeAt(0); (ref2 <= ref3 ? k <= ref3 : k >= ref3); code = ref2 <= ref3 ? ++k : --k) {
                results.push(expect(esutils.code.isLineTerminator(code)).to.be.false);
            }
            return results;
        });
    });
    describe('isIdentifierStartES5', function() {
        it('returns true if provided code can be a start of Identifier in ES5', function() {
            const characters = ['a', '_', '$', 'ゆ'];
            const ref = characters.map(function(ch) {
                return ch.charCodeAt(0);
            });
            const results = [];
            for (const code of ref) {
                results.push(expect(esutils.code.isIdentifierStartES5(code)).to.be.true);
            }
            return results;
        });
        it('returns false if provided code cannot be a start of Identifier in ES5', function() {
            const results = [];
            for (let ch = 0, i = 0; i <= 9; ch = ++i) {
                results.push(expect(esutils.code.isIdentifierStartES5((String(ch)).charCodeAt(0))).to.be.false);
            }
            return results;
        });
    });
    describe('isIdentifierPartES5', function() {
        it('returns true if provided code can be a part of Identifier in ES5', function() {
            const characters = ['a', '_', '$', 'ゆ'];
            const ref = characters.map(function(ch) {
                return ch.charCodeAt(0);
            });
            for (const code of ref) {
                expect(esutils.code.isIdentifierPartES5(code)).to.be.true;
            }
            const results = [];
            for (let ch = 0, j = 0; j <= 9; ch = ++j) {
                results.push(expect(esutils.code.isIdentifierPartES5((String(ch)).charCodeAt(0))).to.be.true);
            }
            return results;
        });
        it('returns false if provided code cannot be a part of Identifier in ES5', function() {
            expect(esutils.code.isIdentifierPartES5('+'.charCodeAt(0))).to.be.false;
            expect(esutils.code.isIdentifierPartES5('-'.charCodeAt(0))).to.be.false;
        });
    });
    describe('isIdentifierStartES6', function() {
        it('returns true if provided code can be a start of Identifier in ES6', function() {
            const characters = ['a', '_', '$', 'ゆ', '\u0AF9'];
            const ref = characters.map(function(ch) {
                return ch.charCodeAt(0);
            });
            const results = [];
            for (const code of ref) {
                results.push(expect(esutils.code.isIdentifierStartES6(code)).to.be.true);
            }
            return results;
        });

        it('returns false if provided code cannot be a start of Identifier in ES6', function() {
            const results = [];
            for (let ch = 0, i = 0; i <= 9; ch = ++i) {
                results.push(expect(esutils.code.isIdentifierStartES6((String(ch)).charCodeAt(0))).to.be.false);
            }
            return results;
        });
    });

    describe('isIdentifierPartES6', function() {
        it('returns true if provided code can be a part of Identifier in ES6', function() {
            const characters = ['a', '_', '$', 'ゆ'];
            const ref = characters.map(function(ch) {
                return ch.charCodeAt(0);
            });
            for (const code of ref) {
                expect(esutils.code.isIdentifierPartES6(code)).to.be.true;
            }
            const results = [];
            for (let ch = 0, j = 0; j <= 9; ch = ++j) {
                results.push(expect(esutils.code.isIdentifierPartES6((String(ch)).charCodeAt(0))).to.be.true);
            }
            return results;
        });
        it('supports astral symbols', function() {
            expect(esutils.code.isIdentifierPartES6(0xE01D5)).to.be.true;
        });
        it('returns false if provided code cannot be a part of Identifier in ES6', function() {
            expect(esutils.code.isIdentifierPartES6('+'.charCodeAt(0))).to.be.false;
            expect(esutils.code.isIdentifierPartES6('-'.charCodeAt(0))).to.be.false;
        });
    });
});
