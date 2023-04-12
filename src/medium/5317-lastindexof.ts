/**
 * 5317 - LastIndexOf
 *
 * Implement the type version of ```Array.lastIndexOf```, ```LastIndexOf<T, U>```  takes an Array ```T```, any ```U``` and returns the index of the last ```U``` in Array ```T```
 */

/* _____________ Your Code Here _____________ */

// type LastIndexOf<
//   T extends unknown[],
//   U,
//   R extends unknown[] = [],
//   I extends number = -1
// > = T extends [infer X, ...infer Y]
//   ? Equal<U, X> extends true
//     ? LastIndexOf<Y, U, [...R, unknown], R['length']>
//     : LastIndexOf<Y, U, [...R, unknown], I>
//   : I;

type LastIndexOf<T extends unknown[], U> = T extends [...infer F, infer R]
  ? Equal<R, U> extends true
    ? F['length']
    : LastIndexOf<F, U>
  : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>
];
