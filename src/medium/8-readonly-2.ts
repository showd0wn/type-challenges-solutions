/**
 * 8 - Readonly 2
 *
 * 实现一个通用 `MyReadonly2<T, K>`，它带有两种类型的参数 `T` 和 `K`。
 * `K`指定应设置为 Readonly 的 `T` 的属性集。如果未提供 `K`，则应使所有属性都变为只读，就像普通的 `Readonly<T>` 一样。
 */

/* _____________ 你的代码 _____________ */

type MyReadonly2<T, K extends keyof T = keyof T> = Readonly<Pick<T, K>> &
  Omit<T, K>;

/* _____________ 测试用例 _____________ */
import type { Alike, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>
];

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}
