/**
 * 10 - 元组转合集
 *
 * 实现一个通用的 `TupleToUnion<T>`，返回元组所有值的合集
 */

/* _____________ 你的代码 _____________ */

type TupleToUnion<T extends readonly unknown[]> = T[number];

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>
];
