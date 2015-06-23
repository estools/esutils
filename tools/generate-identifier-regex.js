// Based on https://gist.github.com/mathiasbynens/6334847 by @mathias
'use strict';

var regenerate = require('regenerate');

// Which Unicode version should be used?
var version = '7.0.0';

// Set up a shorthand function to import Unicode data.
var get = function(what) {
    return require('unicode-' + version + '/' + what + '/code-points');
};

// Get the Unicode categories needed to construct the ES5 regex.
var Lu = get('categories/Lu');
var Ll = get('categories/Ll');
var Lt = get('categories/Lt');
var Lm = get('categories/Lm');
var Lo = get('categories/Lo');
var Nl = get('categories/Nl');
var Mn = get('categories/Mn');
var Mc = get('categories/Mc');
var Nd = get('categories/Nd');
var Pc = get('categories/Pc');

var es5regexes = (function() { // ES 5.1
    // http://mathiasbynens.be/notes/javascript-identifiers#valid-identifier-names
    var identifierStart = regenerate()
        .add(Lu, Ll, Lt, Lm, Lo, Nl)
        .removeRange(0x010000, 0x10FFFF) // remove astral symbols
        .removeRange(0x0, 0x7F); // remove ASCII symbols (esutils-specific)
    var identifierStartCodePoints = identifierStart.toArray();
    var identifierPart = regenerate(identifierStartCodePoints)
        .add('\u200C', '\u200D', Mn, Mc, Nd, Pc)
        .removeRange(0x010000, 0x10FFFF) // remove astral symbols
        .removeRange(0x0, 0x7F); // remove ASCII symbols (esutils-specific)
    return {
        'NonAsciiIdentifierStart': '/' + identifierStart + '/',
        'NonAsciiIdentifierPart': '/' + identifierPart + '/',
    };
}());

// Get the Unicode properties needed to construct the ES6 regex.
var ID_Start = get('properties/ID_Start');
var ID_Continue = get('properties/ID_Continue');
var Other_ID_Start = get('properties/Other_ID_Start');

var es6regexes = (function() {
    // http://ecma-international.org/ecma-262/6.0/#sec-identifier-names-static-semantics-early-errors
    // http://unicode.org/reports/tr31/#Default_Identifier_Syntax
    // https://bugs.ecmascript.org/show_bug.cgi?id=2717#c0
    var identifierStart = regenerate(ID_Start)
        // Note: this already includes `Other_ID_Start`. http://git.io/wRCAfQ
        .removeRange(0x0, 0x7F); // remove ASCII symbols (esutils-specific)
    var identifierPart = regenerate(ID_Continue)
        // Note: `ID_Continue` already includes `Other_ID_Continue`. http://git.io/wRCAfQ
        .add(Other_ID_Start)
        .add('\u200C', '\u200D')
        .removeRange(0x0, 0x7F); // remove ASCII symbols (esutils-specific)

    return {
        'NonAsciiIdentifierStart': '/' + identifierStart + '/',
        'NonAsciiIdentifierPart': '/' + identifierPart + '/',
    };
}());

console.log(
    '// ECMAScript 5.1/Unicode v%s NonAsciiIdentifierStart:\n%s\n',
    version,
    es5regexes.NonAsciiIdentifierStart
);
console.log(
    '// ECMAScript 5.1/Unicode v%s NonAsciiIdentifierPart:\n%s\n',
    version,
    es5regexes.NonAsciiIdentifierPart
);

console.log(
    '// ECMAScript 6/Unicode v%s NonAsciiIdentifierStart:\n%s\n',
    version,
    es6regexes.NonAsciiIdentifierStart
);
console.log(
    '// ECMAScript 6/Unicode v%s NonAsciiIdentifierPart:\n%s',
    version,
    es6regexes.NonAsciiIdentifierPart
);
