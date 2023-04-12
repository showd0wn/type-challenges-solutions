/**
 * 216 - Slice
 *
 * Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes the three argument. The output should be a subarray of `Arr` from index `Start` to `End`. Indexes with negative numbers should be counted from reversely.
 */

/* _____________ Your Code Here _____________ */

type ConstructTuple<L, R extends unknown[] = []> = R['length'] extends L
  ? R
  : ConstructTuple<L, [...R, unknown]>;

type AddOne<N> = [...ConstructTuple<N>, unknown]['length'];

type MinusOne<N> = ConstructTuple<N> extends [...infer X, infer _]
  ? X['length']
  : 0;

type Minus<X, Y, R = 0> = X extends Y ? R : Minus<X, AddOne<Y>, AddOne<R>>;

// N1 >= N2 ? true : false
type Compare<N1, N2> = N2 extends 0
  ? true
  : N1 extends 0
  ? false
  : Compare<MinusOne<N1>, MinusOne<N2>>;

type String2Number<
  A extends string,
  B extends unknown[] = []
> = `${B['length']}` extends A
  ? B['length']
  : String2Number<A, [...B, unknown]>;

// 若 N 为负数: L >= P ? L - P : L (P = -N)
type ToPositive<L, N> = `${N & number}` extends `-${infer P}`
  ? Compare<L, String2Number<P>> extends true
    ? Minus<L, String2Number<P>>
    : 0
  : N;

type NumberRange<
  L,
  H,
  T extends unknown[] = ConstructTuple<L>,
  R = never
> = T['length'] extends H
  ? H | R
  : NumberRange<L, H, [...T, unknown], T['length'] | R>;

type Slice<
  Arr extends unknown[],
  Start = 0,
  End = Arr['length'],
  L = Arr['length'],
  S = ToPositive<L, Start>,
  E = ToPositive<L, End>
> = S extends NumberRange<0, L>
  ? E extends NumberRange<0, S>
    ? []
    : SliceArray<Arr, S, E>
  : [];

type SliceArray<
  Arr extends unknown[],
  Start = 0,
  End = Arr['length']
> = Start extends End
  ? []
  : Start extends Arr['length']
  ? []
  : [Arr[Start & number], ...SliceArray<Arr, AddOne<Start>, End>];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Arr = [1, 2, 3, 4, 5];

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>
];
