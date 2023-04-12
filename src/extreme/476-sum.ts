/**
 * 476 - Sum
 *
 * Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.
 */

/* _____________ Your Code Here _____________ */

type NumberLike = string | number | bigint;

type ToTuple<S, R extends unknown[] = []> = S extends string
  ? `${R['length']}` extends S
    ? R
    : ToTuple<S, [...R, unknown]>
  : never;

// e.g. '2' + '3' -> '5'
type Add<A, B, L = [...ToTuple<A>, ...ToTuple<B>]['length']> = L extends number
  ? `${L}`
  : never;

// e.g. '103' -> ['1', '0', '3']
type ToDigits<
  N extends NumberLike,
  A extends string[] = []
> = `${N}` extends `${infer F}${infer R}` ? ToDigits<R, [...A, F]> : A;

// e.g. ['1', '0', '3'] -> '103'
type ToString<T, S extends string = ''> = T extends NumberLike[]
  ? T extends [infer F, ...infer R]
    ? F extends NumberLike
      ? ToString<R, `${S}${F}`>
      : never
    : S
  : never;

// e.g. ['1', '0', '3'] + ['5', '2', '9'] -> ['6', '3', '2']
type SumDigits<A, B> = A extends [...infer Ra, infer Ta]
  ? B extends [...infer Rb, infer Tb]
    ? ToDigits<Add<Ta, Tb>> extends [...infer Rs, infer Ts]
      ? [...SumDigits<Ra, SumDigits<Rb, Rs>>, Ts]
      : never
    : A
  : B extends []
  ? []
  : B;

type Sum<A extends NumberLike, B extends NumberLike> = ToString<
  SumDigits<ToDigits<A>, ToDigits<B>>
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>
];
