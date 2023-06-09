/**
 * 2822 - Split
 *
 * The well known `split()` method splits a string into an array of substrings by looking for a separator, and returns the new array. The goal of this challenge is to split a string, by using a separator, but in the type system!
 */

/* _____________ Your Code Here _____________ */

type Split<S extends string, SEP extends string> = string extends S
  ? string[]
  : S extends `${infer X}${SEP}${infer Y}`
  ? [X, ...Split<Y, SEP>]
  : SEP extends ''
  ? []
  : [S];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Split<'Hi! How are you?', 'z'>, ['Hi! How are you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ' '>, ['Hi!', 'How', 'are', 'you?']>>,
  Expect<
    Equal<
      Split<'Hi! How are you?', ''>,
      [
        'H',
        'i',
        '!',
        ' ',
        'H',
        'o',
        'w',
        ' ',
        'a',
        'r',
        'e',
        ' ',
        'y',
        'o',
        'u',
        '?'
      ]
    >
  >,
  Expect<Equal<Split<'', ''>, []>>,
  Expect<Equal<Split<'', 'z'>, ['']>>,
  Expect<Equal<Split<string, 'whatever'>, string[]>>
];
