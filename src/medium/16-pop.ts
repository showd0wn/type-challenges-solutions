/**
 * 16 - 出堆
 *
 * 实现一个通用 `Pop<T>`，它接受一个数组 `T` 并返回一个没有最后一个元素的数组
 */

/* _____________ 你的代码 _____________ */

type Pop<T extends unknown[]> = T extends [...infer P, unknown] ? P : never;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>
];
