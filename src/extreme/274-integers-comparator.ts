/**
 * 274 - Integers Comparator
 *
 * Implement a type-level integers comparator
 * Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative
 */

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type ConstructTuple<L, R extends unknown[] = []> = R['length'] extends L
  ? R
  : ConstructTuple<L, [...R, unknown]>;

type MinusOne<N> = ConstructTuple<N> extends [...infer X, infer _]
  ? X['length']
  : 0;

type ToNumber<
  S extends string,
  Res extends unknown[] = []
> = `${Res['length']}` extends S
  ? Res['length']
  : ToNumber<S, [...Res, unknown]>;
type IsNegative<S extends number> = `${S}` extends `-${infer _}` ? true : false;
type ToAbsolute<S extends number> = IsNegative<S> extends false
  ? S
  : `${S}` extends `-${infer R}`
  ? ToNumber<R>
  : never;

type Comparator<A extends number, B extends number> = A extends B
  ? Comparison.Equal
  : IsNegative<A> extends true
  ? IsNegative<B> extends true
    ? ComparatorNegative<A, B>
    : Comparison.Lower
  : IsNegative<B> extends true
  ? Comparison.Greater
  : ComparatorNonNegative<A, B>;

type ComparatorNonNegative<A extends number, B extends number> = B extends 0
  ? Comparison.Greater
  : A extends 0
  ? Comparison.Lower
  : ComparatorNonNegative<MinusOne<A>, MinusOne<B>>;
type ComparatorNegative<
  A extends number,
  B extends number
> = ComparatorNonNegative<
  ToAbsolute<A>,
  ToAbsolute<B>
> extends Comparison.Greater
  ? Comparison.Lower
  : Comparison.Greater;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>
];
