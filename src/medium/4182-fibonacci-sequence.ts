/**
 * 4182 - 斐波那契序列
 *
 * Implement a generic Fibonacci\<T\> takes an number T and returns it's corresponding Fibonacci number.
 */

/* _____________ 你的代码 _____________ */

// type Push<T extends unknown[], U = unknown> = [...T, U];
// type MinusOne<
//   T extends number,
//   U extends unknown[] = []
// > = Push<U>['length'] extends T ? U['length'] : MinusOne<T, [...U, unknown]>;

// type ConstructTuple<
//   L extends number,
//   R extends unknown[] = []
// > = R['length'] extends L ? R : ConstructTuple<L, [...R, unknown]>;

// type Add<X extends number, Y extends number> = [
//   ...ConstructTuple<X>,
//   ...ConstructTuple<Y>
// ]['length'];

// type Fibonacci<T extends number> = T extends 1 | 2
//   ? 1
//   : Add<Fibonacci<MinusOne<N>>, Fibonacci<MinusOne<MinusOne<N>>>>;

type Fibonacci<
  T extends number,
  R extends number[] = [1, 1, 1],
  A extends number[] = [1],
  B extends number[] = [1]
> = T extends 1 | 2
  ? 1
  : T extends R['length']
  ? [...A, ...B]['length']
  : Fibonacci<T, [1, ...R], B, [...A, ...B]>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [Expect<Equal<Fibonacci<3>, 2>>, Expect<Equal<Fibonacci<8>, 21>>];
