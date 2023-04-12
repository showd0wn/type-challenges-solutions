/**
 * 730 - Union to Tuple
 *
 * Implement a type, `UnionToTuple`, that converts a union to a tuple.
 * As we know, union is an unordered structure, but tuple is an ordered, which implies that we are not supposed to preassume any order will be preserved between terms of one union, when unions are created or transformed.
 * Hence in this challenge, **any permutation of the elements in the output tuple is acceptable**.
 */

/* _____________ Your Code Here _____________ */

// 55 - Union to Intersection
// 前置知识：利用 conditional type 和函数参数类型逆变，将联合类型转化成交叉类型。
type UnionToIntersection<U> = (
  U extends any ? (args: U) => void : never
) extends (args: infer I) => void
  ? I
  : never;

// 先构造交叉函数类型，交叉函数类型等价于函数的重载。
// 利用重载函数在使用 infer 进行推断时，重载的部分会取最后一个声明，推导出交叉类型的最后一个类型。
type UnionLast<U> = UnionToIntersection<
  U extends any ? () => U : never
> extends () => infer P
  ? P
  : never;

type UnionToTuple<U, RTN extends unknown[] = [], LAST = UnionLast<U>> = [
  U
] extends [never]
  ? RTN
  : UnionToTuple<Exclude<U, LAST>, [...RTN, LAST]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type ExtractValuesOfTuple<T extends any[]> = T[keyof T & number];

type cases = [
  Expect<Equal<UnionToTuple<'a' | 'b'>['length'], 2>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b'>>, 'a' | 'b'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a'>>, 'a'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any>>, any>>,
  Expect<
    Equal<ExtractValuesOfTuple<UnionToTuple<undefined | void | 1>>, void | 1>
  >,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any>>,
  Expect<
    Equal<
      ExtractValuesOfTuple<UnionToTuple<'d' | 'f' | 1 | never>>,
      'f' | 'd' | 1
    >
  >,
  Expect<
    Equal<ExtractValuesOfTuple<UnionToTuple<[{ a: 1 }] | 1>>, [{ a: 1 }] | 1>
  >,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<never>>, never>>,
  Expect<
    Equal<
      ExtractValuesOfTuple<
        UnionToTuple<'a' | 'b' | 'c' | 1 | 2 | 'd' | 'e' | 'f' | 'g'>
      >,
      'f' | 'e' | 1 | 2 | 'g' | 'c' | 'd' | 'a' | 'b'
    >
  >
];
