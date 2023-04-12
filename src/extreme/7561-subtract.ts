/**
 * 7561 - Subtract
 */

/* _____________ Your Code Here _____________ */

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types
type Tuple<T extends number, Res extends 1[] = []> = 0 extends 1
  ? never
  : Res['length'] extends T
  ? Res
  : Tuple<T, [...Res, 1]>;

// M => minuend, S => subtrahend
type Subtract<M extends number, S extends number> = Tuple<M> extends [
  ...Tuple<S>,
  ...infer Rest
]
  ? Rest['length']
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  Expect<Equal<Subtract<1000, 999>, 1>>
];
