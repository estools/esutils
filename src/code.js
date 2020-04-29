/* eslint-disable no-misleading-character-class */
/*
  Copyright (C) 2013-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>

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

import * as ES5Regex from './es5-identifier.js';
import * as ES6Regex from './es6-identifier.js';

function isDecimalDigit(ch) {
    return 0x30 <= ch && ch <= 0x39;  // 0..9
}

function isHexDigit(ch) {
    return 0x30 <= ch && ch <= 0x39 ||  // 0..9
        0x61 <= ch && ch <= 0x66 ||     // a..f
        0x41 <= ch && ch <= 0x46;       // A..F
}

function isOctalDigit(ch) {
    return ch >= 0x30 && ch <= 0x37;  // 0..7
}

// 7.2 White Space

const NON_ASCII_WHITESPACES = [
    0x1680,
    0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A,
    0x202F, 0x205F,
    0x3000,
    0xFEFF
];

function isWhiteSpace(ch) {
    return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 ||
        ch >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0;
}

// 7.3 Line Terminators

function isLineTerminator(ch) {
    return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
}

// 7.6 Identifier Names and Identifiers

function fromCodePoint(cp) {
    if (cp <= 0xFFFF) { return String.fromCharCode(cp); }
    const cu1 = String.fromCharCode(Math.floor((cp - 0x10000) / 0x400) + 0xD800);
    const cu2 = String.fromCharCode(((cp - 0x10000) % 0x400) + 0xDC00);
    return cu1 + cu2;
}

const IDENTIFIER_START = new Array(0x80);
for(let ch = 0; ch < 0x80; ++ch) {
    IDENTIFIER_START[ch] =
        ch >= 0x61 && ch <= 0x7A ||  // a..z
        ch >= 0x41 && ch <= 0x5A ||  // A..Z
        ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
}

const IDENTIFIER_PART = new Array(0x80);
for(let ch = 0; ch < 0x80; ++ch) {
    IDENTIFIER_PART[ch] =
        ch >= 0x61 && ch <= 0x7A ||  // a..z
        ch >= 0x41 && ch <= 0x5A ||  // A..Z
        ch >= 0x30 && ch <= 0x39 ||  // 0..9
        ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
}

function isIdentifierStartES5(ch) {
    return ch < 0x80 ? IDENTIFIER_START[ch] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
}

function isIdentifierPartES5(ch) {
    return ch < 0x80 ? IDENTIFIER_PART[ch] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
}

function isIdentifierStartES6(ch) {
    return ch < 0x80 ? IDENTIFIER_START[ch] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
}

function isIdentifierPartES6(ch) {
    return ch < 0x80 ? IDENTIFIER_PART[ch] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
}

export {
    isDecimalDigit,
    isHexDigit,
    isOctalDigit,
    isWhiteSpace,
    isLineTerminator,
    isIdentifierStartES5,
    isIdentifierPartES5,
    isIdentifierStartES6,
    isIdentifierPartES6
};

/* vim: set sw=4 ts=4 et tw=80 : */
