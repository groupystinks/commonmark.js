import commonmark from '../lib/index.js';
import expect from 'expect';

describe('preserve markdown tag', () => {
  const parser = new commonmark.Parser({preserveRaw: true});
  const input =
    "## This is a header ##\n" +
    "1. And this is a amazing word\n" +
    "\t- this is sublist\n" +
    "2. this is second amazing word\n\n" +
    "this is **STRONG**\n\n" +
    "this is _italic_\n\n" +
    "this is *also italic*\n\n";

  it('should generate ast that have "document" as first layer', () => {
    const parsed = parser.parse(input);
    const actual = parsed._type;
    const expected = 'document';
    expect(actual).toEqual(expected);
  });

  it('should have heading markdown tag and trailing hash', () => {
    const parsed = parser.parse(input);
    const actual = parsed._firstChild._firstChild._literal;
    const expected = '## This is a header ##';
    expect(actual).toEqual(expected);
  });

  it('should have list item markdown tag', () => {
    const parsed = parser.parse(input);
    const actual = parsed._firstChild._next._firstChild._firstChild._firstChild._literal;
    const expected = '1. And this is a amazing word';
    expect(actual).toEqual(expected);
  });

  it('should have sublist item markdown tag', () => {
    const parsed = parser.parse(input);
    const actual = parsed._firstChild._next._firstChild._lastChild._firstChild._firstChild._firstChild._literal;
    const expected = '- this is sublist';
    expect(actual).toEqual(expected);
  });

  // it('should have code block markdown tag', () => {
  //   const parsed = parser.parse(input);
  //   const actual = parsed._firstChild._next._next._literal;
  //   const expected = '``````\n';
  //   // const expected = '```\n```\n';
  //   expect(actual).toEqual(expected);
  // });

  // it should preserve strong ** **
  it('should preserve ** **', () => {
    const parsed = parser.parse(input);
    const actual = parsed._firstChild._next._next._firstChild._next._firstChild._literal;
    const expected = '**STRONG**';
    // console.log('out', parsed._firstChild._next._next._firstChild._next);
    expect(actual).toEqual(expected);
  });

  it('should preserve _ _', () => {
    const parsed = parser.parse(input);
    const actual = parsed._firstChild._next._next._next._firstChild._next._firstChild._literal;
    const expected = '_italic_';
    expect(actual).toEqual(expected);
  });

  it('should preserve * *', () => {
    const parsed = parser.parse(input);
    const actual = parsed._firstChild._next._next._next._next._firstChild._next._firstChild._literal;
    const expected = '*also italic*';
    expect(actual).toEqual(expected);
  });
});
