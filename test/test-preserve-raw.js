var commonmark = require('../lib/index.js');

var input =
  "## This is a header ##\n\n1. And this is a amazing word\n\t- this is subitem\n\n" +
  "2. this is second amazing word" +
  "```\nfunction()\n```";

var parser = new commonmark.Parser({preserveRaw: true});

var parsed = parser.parse(input);

// console.log('parsed', parsed);
// console.log('heading', parsed._firstChild._firstChild._literal);
console.log('list item paragraph text', parsed._firstChild._next._firstChild._firstChild._firstChild._literal);
console.log('list item subitem paragraph text', parsed._firstChild._next._firstChild._lastChild._firstChild._firstChild._firstChild._literal);
// console.log('code_block\n', parsed._firstChild._next._next._literal);
