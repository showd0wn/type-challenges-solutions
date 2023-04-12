/**
 * 5117 - 去除数组指定元素
 *
 * 实现一个像 Lodash.without 函数一样的泛型 Without<T, U>，它接收数组类型的 T 和数字或数组类型的 U 为参数，会返回一个去除 U 中元素的数组 T。
 */

/* _____________ 你的代码 _____________ */

type Without<
  T extends unknown[],
  U extends unknown | unknown[],
  R extends unknown[] = []
> = T extends [infer X, ...infer Y]
  ? U extends unknown[]
    ? X extends U[number]
      ? Without<Y, U, R>
      : Without<Y, U, [...R, X]>
    : X extends U
    ? Without<Y, U, R>
    : Without<Y, U, [...R, X]>
  : R;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];
