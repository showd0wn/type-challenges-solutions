/**
 * 4425 - Greater Than
 *
 * In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`
 *
 * Negative numbers do not need to be considered.
 */

/* _____________ Your Code Here _____________ */

type ConstructTuple<
  L extends number,
  R extends unknown[] = []
> = R['length'] extends L ? R : ConstructTuple<L, [...R, unknown]>;

type Pop<T extends unknown[]> = T extends [...infer P, unknown] ? P : never;

type GreaterThan<
  T extends number,
  U extends number,
  X extends unknown[] = ConstructTuple<T>,
  Y extends unknown[] = ConstructTuple<U>
> = X['length'] extends 0
  ? false
  : Y['length'] extends 0
  ? true
  : GreaterThan<T, U, Pop<X>, Pop<Y>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>
];
