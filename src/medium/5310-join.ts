/**
 * 5310 - Join
 *
 * Implement the type version of Array.join, Join<T, U> takes an Array T, string or number U and returns the Array T with U stitching up.
 */

/* _____________ Your Code Here _____________ */

type Join<T extends unknown[], U extends string | number> = T extends [
  infer F,
  ...infer R
]
  ? R['length'] extends 0
    ? F
    : `${F & string}${U}${Join<R, U>}`
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>
];
