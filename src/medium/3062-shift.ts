/**
 * 3062 - Shift
 *
 * Implement the type version of ```Array.shift```
 */

/* _____________ Your Code Here _____________ */

type Shift<T extends unknown[]> = T extends [infer _, ...infer R] ? R : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>
];
