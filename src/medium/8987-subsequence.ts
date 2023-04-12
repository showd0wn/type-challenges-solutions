/**
 * 8987 - Subsequence
 *
 * Given an array of unique elements, return all possible subsequences.
 * A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.
 */

/* _____________ Your Code Here _____________ */

type Subsequence<T extends unknown[]> = T extends [infer X, ...infer Y]
  ? [X, ...Subsequence<Y>] | Subsequence<Y>
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<
    Equal<
      Subsequence<[1, 2, 3]>,
      [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]
    >
  >
];
