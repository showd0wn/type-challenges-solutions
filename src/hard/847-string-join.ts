/**
 * 847 - String Join
 */

/* _____________ Your Code Here _____________ */

declare function join<S extends string>(
  delimiter: S
): <T extends string[]>(...parts: T) => Joined<S, T>;

type Joined<S extends string, T extends unknown[], F = true> = T extends [
  infer X,
  ...infer Y
]
  ? X extends string
    ? `${F extends true ? '' : S}${X}${Joined<S, Y, false>}`
    : never
  : '';

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

// Edge cases
const noCharsOutput = join('-')();
const oneCharOutput = join('-')('a');
const noDelimiterOutput = join('')('a', 'b', 'c');

// Regular cases
const hyphenOutput = join('-')('a', 'b', 'c');
const hashOutput = join('#')('a', 'b', 'c');
const twoCharOutput = join('-')('a', 'b');
const longOutput = join('-')('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');

type cases = [
  Expect<Equal<typeof noCharsOutput, ''>>,
  Expect<Equal<typeof oneCharOutput, 'a'>>,
  Expect<Equal<typeof noDelimiterOutput, 'abc'>>,
  Expect<Equal<typeof twoCharOutput, 'a-b'>>,
  Expect<Equal<typeof hyphenOutput, 'a-b-c'>>,
  Expect<Equal<typeof hashOutput, 'a#b#c'>>,
  Expect<Equal<typeof longOutput, 'a-b-c-d-e-f-g-h'>>
];
