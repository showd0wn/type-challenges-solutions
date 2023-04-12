/**
 * 43 - 实现 Exclude
 *
 * 实现内置的 `Exclude<T, U>` 类型
 */

/* _____________ 你的代码 _____________ */

type MyExclude<T, U> = T extends U ? never : T;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, Exclude<'a' | 'b' | 'c', 'a'>>>,
  Expect<
    Equal<
      MyExclude<'a' | 'b' | 'c', 'a' | 'b'>,
      Exclude<'a' | 'b' | 'c', 'a' | 'b'>
    >
  >,
  Expect<
    Equal<
      MyExclude<string | number | (() => void), Function>,
      Exclude<string | number | (() => void), Function>
    >
  >
];
