/**
 * 151 - Query String Parser
 *
 * You're required to implement a type-level parser to parse URL query string into a object literal type.
 */

/* _____________ Your Code Here _____________ */

type ParseQueryStringToTuple<S extends string> =
  S extends `${infer X}&${infer Y}`
    ? [...ParseQueryStringToTuple<X>, ...ParseQueryStringToTuple<Y>]
    : S extends `${infer K}=${infer V}`
    ? [{ [P in K]: V }]
    : S extends ''
    ? [{}]
    : [{ [P in S]: true }];

type GetTypeFromTuple<P, T, R extends unknown[] = []> = T extends [
  infer X,
  ...infer Y
]
  ? P extends keyof X
    ? X[P] extends R[number]
      ? GetTypeFromTuple<P, Y, R>
      : GetTypeFromTuple<P, Y, [...R, X[P]]>
    : GetTypeFromTuple<P, Y, R>
  : R['length'] extends 1
  ? R[0]
  : R;

type Keys<U> = U extends Record<string, unknown> ? keyof U : never;

type ParseQueryString<
  S extends string,
  T extends Record<string, string | boolean>[] = ParseQueryStringToTuple<S>
> = {
  [P in Keys<T[number]>]: GetTypeFromTuple<P, T>;
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<
    Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>
  >,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>
];
