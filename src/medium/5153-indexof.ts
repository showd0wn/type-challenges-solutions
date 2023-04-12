/**
 * 5153 - IndexOf
 *
 * Implement the type version of Array.indexOf, indexOf<T, U> takes an Array T, any U and returns the index of the first U in Array T.
 */

/* _____________ Your Code Here _____________ */

type IndexOf<T extends unknown[], U, R extends unknown[] = []> = T extends [
  infer X,
  ...infer Y
]
  ? Equal<U, X> extends true
    ? R['length']
    : IndexOf<Y, U, [...R, unknown]>
  : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>
];
