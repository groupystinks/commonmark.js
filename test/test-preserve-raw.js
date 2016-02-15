var commonmark = require('../lib/index.js');

var input =
  "## This is a header ##\n\nAnd this is **a _amazing_** word\n\n" +
  "```\nfunction()\n```";

var parser = new commonmark.Parser({preserveRaw: true});

var parsed = parser.parse(input);

// console.log('parsed', parsed);
console.log('heading', parsed._firstChild._firstChild._literal);
console.log('text', parsed._firstChild.next._firstChild.next._firstChild._literal);
console.log('code_block\n', parsed._firstChild._next._next._literal);
