/**
 * 4499 - Chunk
 *
 * Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
 * `Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`
 */

/* _____________ Your Code Here _____________ */

type Chunk<
  T extends unknown[],
  U extends number,
  X extends unknown[] = [],
  Y extends unknown[] = []
> = T extends [infer F, ...infer R]
  ? Y['length'] extends U
    ? Chunk<R, U, [...X, Y], [F]>
    : Chunk<R, U, X, [...Y, F]>
  : Y['length'] extends 0
  ? X
  : [...X, Y];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
];
