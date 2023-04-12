/**
 * 517 - Multiply
 *
 * This challenge continues from [476 - Sum](https://tsch.js.org/476), it is recommended that you finish that one first, and modify your code based on it to start this challenge.
 * Implement a type `Multiply<A, B>` that multiplies two non-negative integers and returns their product as a string. Numbers can be specified as string, number, or bigint.
 */

/* _____________ Your Code Here _____________ */

type Reverse<A extends string | number | bigint> =
  `${A}` extends `${infer AH}${infer AT}` ? `${Reverse<AT>}${AH}` : '';

type DigsNext = {
  '0': '1';
  '1': '2';
  '2': '3';
  '3': '4';
  '4': '5';
  '5': '6';
  '6': '7';
  '7': '8';
  '8': '9';
};
type DigsPrev = { [K in keyof DigsNext as DigsNext[K]]: K };

type AddOne<A> = A extends `${infer AH}${infer AT}`
  ? AH extends '9'
    ? `0${AddOne<AT>}`
    : `${DigsNext[AH & keyof DigsNext]}${AT}`
  : '1';

type SubOne<A> = A extends `${infer AH}${infer AT}`
  ? AH extends '0'
    ? `9${SubOne<AT>}`
    : `${DigsPrev[AH & keyof DigsPrev]}${AT}`
  : never;

type Add<A, B> = A extends `${infer AH}${infer AT}`
  ? B extends `${infer BH}${infer BT}`
    ? BH extends '0'
      ? `${AH}${Add<AT, BT>}`
      : Add<AddOne<A>, SubOne<B>>
    : A
  : B;

type Mul<A extends string, B extends string, R = '0'> = A extends '0'
  ? R
  : B extends '0'
  ? R
  : A extends `${infer AH}${infer AT}`
  ? AH extends '0'
    ? Mul<AT, `0${B}`, R>
    : Mul<SubOne<A>, B, Add<R, B>>
  : R;

type Multiply<
  A extends string | number | bigint,
  B extends string | number | bigint
> = Reverse<Mul<Reverse<A>, Reverse<B>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Multiply<2, 3>, '6'>>,
  Expect<Equal<Multiply<3, '5'>, '15'>>,
  Expect<Equal<Multiply<'4', 10>, '40'>>,
  Expect<Equal<Multiply<0, 16>, '0'>>,
  Expect<Equal<Multiply<'13', '21'>, '273'>>,
  Expect<Equal<Multiply<'43423', 321543n>, '13962361689'>>,
  Expect<Equal<Multiply<9999, 1>, '9999'>>,
  Expect<Equal<Multiply<4325234, '39532'>, '170985150488'>>,
  Expect<Equal<Multiply<100_000n, '1'>, '100000'>>,
  Expect<Equal<Multiply<259, 9125385>, '2363474715'>>,
  Expect<Equal<Multiply<9, 99>, '891'>>,
  Expect<Equal<Multiply<315, '100'>, '31500'>>,
  Expect<Equal<Multiply<11n, 13n>, '143'>>,
  Expect<Equal<Multiply<728, 0>, '0'>>,
  Expect<Equal<Multiply<'0', 213>, '0'>>,
  Expect<Equal<Multiply<0, '0'>, '0'>>
];
