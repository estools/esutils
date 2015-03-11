// Based on https://gist.github.com/mathiasbynens/6334847 by @mathias

var regenerate = require('regenerate');

// Which Unicode version should be used?
var version = '7.0.0'; // note: also update `package.json` when this changes

// Shorthand function
var get = function(what) {
    return require('unicode-' + version + '/' + what + '/code-points');
};

// Get the Unicode properties needed to construct the ES6 regex.
var ID_Start = get('properties/ID_Start');
var ID_Continue = get('properties/ID_Continue');
var Other_ID_Start = get('properties/Other_ID_Start');

var generateES6Regex = function() {
    // https://mathiasbynens.be/notes/javascript-identifiers-es6
    // http://unicode.org/reports/tr31/#Default_Identifier_Syntax
    var identifierStart = regenerate(ID_Start)
        // Note: this already includes `Other_ID_Start`. http://git.io/wRCAfQ
        .add(
            '$',
            '_'
        )
        .removeRange(0x0, 0x7F); // remove ASCII symbols (esutils-specific)
    var identifierPart = regenerate(ID_Continue)
        // Note: `ID_Continue` already includes `Other_ID_Continue`.
        // http://git.io/wRCAfQ
        .add(Other_ID_Start)
        .add(
            '$',
            '_',
            '\u200C',
            '\u200D'
        )
        .removeRange(0x0, 0x7F); // remove ASCII symbols (esutils-specific)
    return {
        'NonAsciiIdentifierStart': identifierStart.toString(),
        'NonAsciiIdentifierPart': identifierPart.toString()
    };
};

var result = generateES6Regex();
console.log(
    '// ECMAScript 6 / Unicode v%s NonAsciiIdentifierStart:\n\n%s\n',
    version,
    result.NonAsciiIdentifierStart
);
console.log(
    '// ECMAScript 5 / Unicode v%s NonAsciiIdentifierPart:\n\n%s',
    version,
    result.NonAsciiIdentifierPart
);
