/**
 * 6141 - Binary to Decimal
 *
 * Implement `BinaryToDecimal<S>` which takes an exact string type `S` consisting 0 and 1 and returns an exact number type corresponding with `S` when `S` is regarded as a binary.
 * You can assume that the length of `S` is equal to or less than 8 and `S` is not empty.
 */

/* _____________ Your Code Here _____________ */

type ConstructTuple<
  N,
  T extends readonly unknown[] = []
> = T['length'] extends N ? T : ConstructTuple<N, [...T, unknown]>;

type Add<X, Y> = [...ConstructTuple<X>, ...ConstructTuple<Y>]['length'];

type Reverse<S extends string | number> = `${S}` extends `${infer X}${infer Y}`
  ? `${Reverse<Y>}${X}`
  : '';

type BinaryToDecimalReverse<
  S extends string,
  I = 1
> = S extends `${infer F}${infer R}`
  ? F extends '0'
    ? BinaryToDecimalReverse<R, Add<I, I>>
    : Add<I, BinaryToDecimalReverse<R, Add<I, I>>>
  : 0;

type BinaryToDecimal<S extends string> = BinaryToDecimalReverse<Reverse<S>>;

// type BinaryToDecimal<
//   S extends string,
//   R extends unknown[] = []
// > = S extends `${infer F}${infer L}`
//   ? F extends '0'
//     ? BinaryToDecimal<L, [...R, ...R]>
//     : BinaryToDecimal<L, [...R, ...R, 1]>
//   : R['length'];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>
];
