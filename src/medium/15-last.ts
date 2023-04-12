/**
 * 15 - 最后一个元素
 *
 * 实现一个通用 `Last<T>`，它接受一个数组 `T` 并返回其最后一个元素的类型
 */

/* _____________ 你的代码 _____________ */

type Last<T extends unknown[]> = T extends [...unknown[], infer P] ? P : never;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];
