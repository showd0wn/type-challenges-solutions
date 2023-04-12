/**
 * 533 - Concat
 *
 * 在类型系统里实现 JavaScript 内置的 `Array.concat` 方法。
 */

/* _____________ 你的代码 _____________ */

type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<
    Equal<
      Concat<['1', 2, '3'], [false, boolean, '4']>,
      ['1', 2, '3', false, boolean, '4']
    >
  >
];
