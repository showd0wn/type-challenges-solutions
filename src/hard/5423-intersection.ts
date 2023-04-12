/**
 * 5423 - Intersection
 *
 * Implement the type version of Lodash.intersection, but there is a little different, Intersection<T> takes an Array T containing several arrays or any type element that includes the union type, returns a new array containing all incoming array intersection elements.
 */

/* _____________ Your Code Here _____________ */

type Intersection<T> = T extends [infer X, ...infer Y]
  ? X extends unknown[]
    ? X[number] & Intersection<Y>
    : X & Intersection<Y>
  : unknown;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>
];
