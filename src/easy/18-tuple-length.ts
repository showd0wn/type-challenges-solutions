/**
 * 18 - 获取元组长度
 *
 * 实现一个通用的 `Length`，接受一个 `readonly` 的数组，返回这个数组的长度
 */

/* _____________ 你的代码 _____________ */

type Length<T extends readonly unknown[]> = T['length'];

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const;
const spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT',
] as const;

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>
];
