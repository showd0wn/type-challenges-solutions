/**
 * 459 - Flatten
 *
 * 实现一个接受数组的类型，并且返回扁平化的数组类型
 */

/* _____________ 你的代码 _____________ */

// type Flatten<T extends unknown[], U extends unknown[] = []> = {
//   [P in keyof T]: T[P] extends (infer R)[] ? R : T[P];
// };

type Flatten<T extends unknown[], U extends unknown[] = []> = T extends [
  infer X,
  ...infer Y
]
  ? X extends unknown[]
    ? Flatten<[...X, ...Y], U>
    : Flatten<Y, [...U, X]>
  : U;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>,
      [{ foo: 'bar'; 2: 10 }, 'foobar']
    >
  >
];
