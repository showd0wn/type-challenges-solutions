/**
 * 7 - 第一个元素
 *
 * 实现一个通用 `First<T>`，接受一个数组 `T` 并返回它的第一个元素的类型
 */

/* _____________ 你的代码 _____________ */

type First<T extends unknown[]> = T extends [] ? never : T[0];
// type First<T extends unknown[]> = T extends [infer P, ...unknown[]] ? P : never;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>
];
