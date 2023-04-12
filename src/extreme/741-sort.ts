/**
 * 741 - Sort
 */

/* _____________ Your Code Here _____________ */

type Sort<A extends number[], B2S extends boolean = false> = B2S extends true
  ? Reverse<BubbleSort<A>>
  : BubbleSort<A>;

type BubbleSort<
  A extends unknown[],
  T extends number = 0
> = T extends A['length']
  ? A
  : AddOne<T> extends number
  ? BubbleSort<BubbleSortOnce<A>, AddOne<T>>
  : never;

type BubbleSortOnce<A extends unknown[]> = A extends [
  infer X,
  infer Y,
  ...infer Rest
]
  ? GreaterThan<X & number, Y & number> extends true
    ? [Y, ...BubbleSortOnce<[X, ...Rest]>]
    : [X, ...BubbleSortOnce<[Y, ...Rest]>]
  : A;

type GreaterThan<T extends number, U extends number> = ToTuple<T> extends [
  ...ToTuple<U>,
  unknown,
  ...infer _
]
  ? true
  : false;

type ToTuple<N extends number, A extends unknown[] = []> = A['length'] extends N
  ? A
  : ToTuple<N, [...A, unknown]>;

type AddOne<N extends number> = [...ToTuple<N>, unknown]['length'];

type Reverse<A extends any[]> = A extends [infer X, ...infer R]
  ? [...Reverse<R>, X]
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Sort<[]>, []>>,
  Expect<Equal<Sort<[1]>, [1]>>,
  Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
  Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
  Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
  Expect<Equal<Sort<[], true>, []>>,
  Expect<Equal<Sort<[1], true>, [1]>>,
  Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
  Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
  Expect<
    Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>
  >
];
