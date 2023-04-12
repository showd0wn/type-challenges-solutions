/**
 * 8804 - Two Sum
 *
 * Given an array of integers `nums` and an integer `target`, return true if two numbers such that they add up to `target`.
 */

/* _____________ Your Code Here _____________ */

type ConstructTuple<
  N,
  T extends readonly unknown[] = []
> = T['length'] extends N ? T : ConstructTuple<N, [...T, unknown]>;

type Add<X, Y> = [...ConstructTuple<X>, ...ConstructTuple<Y>]['length'];

type TwoSumUnion<T, U = 0, S = 0> = U extends 2
  ? S
  : T extends [infer F, ...infer R]
  ? TwoSumUnion<R, Add<U, 1>, Add<S, F>> | TwoSumUnion<R, U, S>
  : never;

type TwoSum<T extends number[], U extends number> = U extends TwoSumUnion<T>
  ? true
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>
];
