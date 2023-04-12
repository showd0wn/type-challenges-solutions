/**
 * 5360 - Unique
 *
 * Implement the type version of Lodash.uniq, Unique<T> takes an Array T, returns the Array T without repeated values.
 */

/* _____________ Your Code Here _____________ */

type Includes<T extends readonly any[], U> = T extends [infer X, ...infer Y]
  ? Equal<U, X> extends true
    ? true
    : Includes<Y, U>
  : false;

type Unique<T extends unknown[], R extends unknown[] = []> = T extends [
  infer X,
  ...infer Y
]
  ? Includes<R, X> extends true
    ? Unique<Y, R>
    : Unique<Y, [...R, X]>
  : R;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<
    Equal<
      Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>,
      [string, number, 1, 'a', 2, 'b']
    >
  >,
  Expect<
    Equal<
      Unique<[unknown, unknown, any, any, never, never]>,
      [unknown, any, never]
    >
  >
];
