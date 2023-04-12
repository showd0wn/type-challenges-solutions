/**
 * 869 - DistributeUnions
 */

/* _____________ Your Code Here _____________ */

type PopUnion<T> = UnionToIntersection<
  T extends any ? (x: T) => 1 : never
> extends (x: infer U) => 1
  ? U
  : never;
type UnionToIntersection<T> = (T extends any ? (x: T) => 1 : never) extends (
  x: infer U
) => infer R
  ? U
  : never;
type UnionToTuple<T, U = PopUnion<T>> = [T] extends [never]
  ? []
  : [U, ...UnionToTuple<Exclude<T, U>>];

type Merge<T> = { [P in keyof T]: T[P] };

type DistributeObject<T, U = UnionToTuple<keyof T>> = U extends [
  infer L,
  ...infer R
]
  ? DistributeUnions<T[keyof T & L]> extends infer V
    ? V extends any
      ? Merge<{ [P in keyof T & L]: V } & DistributeObject<T, R>>
      : never
    : never
  : {};

type DistributeArray<T> = T extends [infer L, ...infer R]
  ? DistributeUnions<L> extends infer U
    ? U extends any
      ? [U, ...DistributeArray<R>]
      : never
    : never
  : [];

type DistributeUnions<T> = T extends any
  ? T extends any[]
    ? DistributeArray<T>
    : T extends object
    ? DistributeObject<T>
    : T
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  // Already distributed unions should stay the same:
  Expect<Equal<DistributeUnions<1>, 1>>,
  Expect<Equal<DistributeUnions<string>, string>>,
  Expect<Equal<DistributeUnions<1 | 2>, 1 | 2>>,
  Expect<
    Equal<
      DistributeUnions<'b' | { type: 'a' } | [1]>,
      'b' | { type: 'a' } | [1]
    >
  >,
  // tuples:
  Expect<Equal<DistributeUnions<[1 | 2, 3]>, [1, 3] | [2, 3]>>,
  Expect<
    Equal<
      DistributeUnions<[1 | 2, 'a' | 'b']>,
      [1, 'a'] | [1, 'b'] | [2, 'a'] | [2, 'b']
    >
  >,
  Expect<
    Equal<
      DistributeUnions<[1 | 2, 'a' | 'b', false | true]>,
      | [1, 'a', false]
      | [1, 'a', true]
      | [1, 'b', false]
      | [1, 'b', true]
      | [2, 'a', false]
      | [2, 'a', true]
      | [2, 'b', false]
      | [2, 'b', true]
    >
  >,
  // objects
  Expect<
    Equal<
      DistributeUnions<{ x: 'a' | 'b'; y: 'c' | 'd' }>,
      | { x: 'a'; y: 'c' }
      | { x: 'a'; y: 'd' }
      | { x: 'b'; y: 'c' }
      | { x: 'b'; y: 'd' }
    >
  >,
  Expect<
    Equal<
      DistributeUnions<
        { type: 'a'; value: number | string } | { type: 'b'; value: boolean }
      >,
      | { type: 'a'; value: string }
      | { type: 'a'; value: number }
      | { type: 'b'; value: false }
      | { type: 'b'; value: true }
    >
  >,
  Expect<
    Equal<
      DistributeUnions<
        | {
            type: 'a';
            option: { kind: 'none' } | { kind: 'some'; value: 'x' | 'y' };
          }
        | { type: 'b'; msg: string }
      >,
      | { type: 'b'; msg: string }
      | { type: 'a'; option: { kind: 'none' } }
      | { type: 'a'; option: { kind: 'some'; value: 'x' } }
      | { type: 'a'; option: { kind: 'some'; value: 'y' } }
    >
  >,
  // mixed structures:
  Expect<
    Equal<
      DistributeUnions<
        [false | true, { value: 'a' | 'b' }, { x: { y: 2 | 3 } }]
      >,
      | [false, { value: 'a' }, { x: { y: 2 } }]
      | [false, { value: 'a' }, { x: { y: 3 } }]
      | [false, { value: 'b' }, { x: { y: 2 } }]
      | [false, { value: 'b' }, { x: { y: 3 } }]
      | [true, { value: 'a' }, { x: { y: 2 } }]
      | [true, { value: 'a' }, { x: { y: 3 } }]
      | [true, { value: 'b' }, { x: { y: 2 } }]
      | [true, { value: 'b' }, { x: { y: 3 } }]
    >
  >,
  Expect<
    Equal<
      DistributeUnions<17 | [10 | { value: 'a' | 'b' }, { x: { y: 2 | 3 } }]>,
      | 17
      | [10, { x: { y: 2 } }]
      | [10, { x: { y: 3 } }]
      | [{ value: 'a' }, { x: { y: 2 } }]
      | [{ value: 'a' }, { x: { y: 3 } }]
      | [{ value: 'b' }, { x: { y: 2 } }]
      | [{ value: 'b' }, { x: { y: 3 } }]
    >
  >
];
