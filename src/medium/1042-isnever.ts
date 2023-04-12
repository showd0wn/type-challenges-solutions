/**
 * 1042 - IsNever
 *
 * Implement a type IsNever, which takes input type `T`.
 * If the type of resolves to `never`, return `true`, otherwise `false`.
 */

/* _____________ Your Code Here _____________ */

type IsNever<T> = [T] extends [never] ? true : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>
];
