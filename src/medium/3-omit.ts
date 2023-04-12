/**
 * 3 - 实现 Omit
 *
 * 实现内置的 `Omit<T, K>` 类型
 */

/* _____________ 你的代码 _____________ */

type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>
];

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}
