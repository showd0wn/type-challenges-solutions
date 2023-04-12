/**
 * 223 - IsAny
 *
 * let's write a utility type `IsAny<T>`, which takes input type `T`. If `T` is `any`, return `true`, otherwise, return `false`.
 */

/* _____________ Your Code Here _____________ */

// IsNever<any> -- boolean
// IsNever<never> -- never
type IsNever<T> = T extends never ? true : false;
type IsAny<T> = boolean extends IsNever<T> ? true : false;

// type IsAny<T> = (1 | 2) extends (T extends never ? 1 : 2) ? true : false
// type IsAny<T> = ((a: [any]) => [any]) extends ((a: T) => T) ? true : false;
// type IsAny<T> = 0 extends (1 & T) ? true : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsAny<any>, true>>,

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>
];
