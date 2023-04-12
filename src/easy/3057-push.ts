/**
 * 3057 - Push
 *
 * 在类型系统里实现 JavaScript 的 `Array.push` 方法
 */

/* _____________ 你的代码 _____________ */

type Push<T extends unknown[], U> = [...T, U];

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>
];
