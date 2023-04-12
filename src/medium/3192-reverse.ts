/**
 * 3192 - Reverse
 *
 * Implement the type version of ```Array.reverse```
 */

/* _____________ Your Code Here _____________ */

type Reverse<T extends unknown[], U extends unknown[] = []> = T extends [
  infer F,
  ...infer R
]
  ? Reverse<R, [F, ...U]>
  : U;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>
];
