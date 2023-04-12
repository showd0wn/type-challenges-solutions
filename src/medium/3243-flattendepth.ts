/**
 * 3243 - FlattenDepth
 *
 * Recursively flatten array up to depth times. Depth defaults to be 1
 */

/* _____________ Your Code Here _____________ */

type FlattenOnce<T extends unknown[], U extends unknown[] = []> = T extends [
  infer X,
  ...infer Y
]
  ? X extends unknown[]
    ? FlattenOnce<Y, [...U, ...X]>
    : FlattenOnce<Y, [...U, X]>
  : U;

type FlattenDepth<
  T extends unknown[],
  U extends number = 1,
  P extends unknown[] = []
> = P['length'] extends U
  ? T
  : FlattenOnce<T> extends T
  ? T
  : FlattenDepth<FlattenOnce<T>, U, [...P, unknown]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
];
