/**
 * 2257 - MinusOne
 *
 * 给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。
 */

/* _____________ 你的代码 _____________ */

// Type instantiation is excessively deep and possibly infinite.
type Pop<T extends unknown[]> = T extends [...infer P, unknown] ? P : never;
type MinusOne<
  T extends number,
  U extends unknown[] = []
> = U['length'] extends T ? Pop<U>['length'] : MinusOne<T, [...U, unknown]>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>
];
