/**
 * 7 - 实现 Readonly
 *
 * 实现内置的 `Readonly<T>` 类型
 */

/* _____________ 你的代码 _____________ */

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}
