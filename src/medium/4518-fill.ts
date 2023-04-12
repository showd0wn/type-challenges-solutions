/**
 * 4518 - Fill
 *
 * `Fill`, a common JavaScript function, now let us implement it with types.
 * `Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
 * The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.
 */

/* _____________ Your Code Here _____________ */

type ConstructTuple<
  L extends number,
  R extends unknown[] = []
> = R['length'] extends L ? R : ConstructTuple<L, [...R, unknown]>;

type Pop<T extends unknown[]> = T extends [...infer P, unknown] ? P : never;

type LessThan<
  T extends number,
  U extends number,
  X extends unknown[] = ConstructTuple<T>,
  Y extends unknown[] = ConstructTuple<U>
> = Y['length'] extends 0
  ? false
  : X['length'] extends 0
  ? true
  : LessThan<T, U, Pop<X>, Pop<Y>>;

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  R extends unknown[] = []
> = T extends [infer X, ...infer Y]
  ? LessThan<R['length'], Start> extends true
    ? Fill<Y, N, Start, End, [...R, X]>
    : LessThan<R['length'], End> extends true
    ? Fill<Y, N, Start, End, [...R, N]>
    : Fill<Y, N, Start, End, [...R, X]>
  : R;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>
];
