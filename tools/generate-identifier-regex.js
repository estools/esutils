// Based on https://gist.github.com/mathiasbynens/6334847 by @mathias
'use strict';

const regenerate = require('regenerate');

// Which Unicode version should be used?
const version = '9.0.0';

// Set up a shorthand function to import Unicode data.
const get = function(what) {
    return require('unicode-' + version + '/' + what + '/code-points');
};

// Get the Unicode categories needed to construct the ES5 regex.
const Lu = get('General_Category/Uppercase_Letter');
const Ll = get('General_Category/Lowercase_Letter');
const Lt = get('General_Category/Titlecase_Letter');
const Lm = get('General_Category/Modifier_Letter');
const Lo = get('General_Category/Other_Letter');
const Nl = get('General_Category/Letter_Number');
const Mn = get('General_Category/Nonspacing_Mark');
const Mc = get('General_Category/Spacing_Mark');
const Nd = get('General_Category/Decimal_Number');
const Pc = get('General_Category/Connector_Punctuation');

const es5regexes = (function() { // ES 5.1
    // http://mathiasbynens.be/notes/javascript-identifiers#valid-identifier-names
    const identifierStart = regenerate()
        .add(Lu, Ll, Lt, Lm, Lo, Nl)
        .removeRange(0x010000, 0x10FFFF) // remove astral symbols
        .removeRange(0x00, 0x7F); // remove ASCII symbols (esutils-specific)
    const identifierStartCodePoints = identifierStart.toArray();
    const identifierPart = regenerate(identifierStartCodePoints)
        .add('\u200C', '\u200D', Mn, Mc, Nd, Pc)
        .removeRange(0x010000, 0x10FFFF) // remove astral symbols
        .removeRange(0x00, 0x7F); // remove ASCII symbols (esutils-specific)
    return {
        'NonAsciiIdentifierStart': '/' + identifierStart + '/',
        'NonAsciiIdentifierPart': '/' + identifierPart + '/',
    };
}());

// Get the Unicode properties needed to construct the ES6 regex.
const ID_Start = get('Binary_Property/ID_Start');
const ID_Continue = get('Binary_Property/ID_Continue');
const Other_ID_Start = get('Binary_Property/Other_ID_Start');

const es6regexes = (function() {
    // http://ecma-international.org/ecma-262/6.0/#sec-identifier-names-static-semantics-early-errors
    // http://unicode.org/reports/tr31/#Default_Identifier_Syntax
    // https://bugs.ecmascript.org/show_bug.cgi?id=2717#c0
    const identifierStart = regenerate(ID_Start)
        // Note: this already includes `Other_ID_Start`. http://git.io/wRCAfQ
        .removeRange(0x00, 0x7F); // remove ASCII symbols (esutils-specific)
    const identifierPart = regenerate(ID_Continue)
        // Note: `ID_Continue` already includes `Other_ID_Continue`. http://git.io/wRCAfQ
        .add(Other_ID_Start)
        .add('\u200C', '\u200D')
        .removeRange(0x00, 0x7F); // remove ASCII symbols (esutils-specific)

    return {
        'NonAsciiIdentifierStart': '/' + identifierStart + '/',
        'NonAsciiIdentifierPart': '/' + identifierPart + '/',
    };
}());


// update the file carrying these regexes:
var fs = require('fs');

var src = fs.readFileSync(__dirname + '/../lib/code.js', 'utf8');
var dst = src.replace(/[\r\n\s]+\/\/\s*See \`tools\/generate-identifier-regex\.js[^]+?ES6Regex[^]+?\};[\r\n\s]*?[\r\n]+/, `

    // See \`tools/generate-identifier-regex.js\`. (\`ES5Regex\` and \`ES6Regex\` declarations are generated.)
    ES5Regex = {
        // ECMAScript 5.1/Unicode v${version} NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: ${es5regexes.NonAsciiIdentifierStart},
        // ECMAScript 5.1/Unicode v${version} NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: ${es5regexes.NonAsciiIdentifierPart}
    };

    ES6Regex = {
        // ECMAScript 6/Unicode v${version} NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: ${es6regexes.NonAsciiIdentifierStart},
        // ECMAScript 6/Unicode v${version} NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: ${es6regexes.NonAsciiIdentifierPart}
    };

`);
fs.writeFileSync(__dirname + '/../lib/code.js', dst, 'utf8');
