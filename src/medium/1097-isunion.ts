/**
 * 1097 - IsUnion
 *
 * Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.
 */

/* _____________ Your Code Here _____________ */

// Distributive Conditional Types
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
type IsUnion<T, U = T> = T extends U ? ([U] extends [T] ? false : true) : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>
];
