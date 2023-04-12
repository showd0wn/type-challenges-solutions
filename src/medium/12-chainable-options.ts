/**
 * 12 - 可串联构造器
 */

/* _____________ 你的代码 _____________ */

type Chainable<T extends Record<string, unknown> = {}> = {
  option<K extends string, V = unknown>(
    key: K extends keyof T ? never : K,
    value: V
  ): Chainable<T & Record<K, V>>;
  get(): T;
};

/* _____________ 测试用例 _____________ */
import type { Alike, Expect } from '@type-challenges/utils';

declare const a: Chainable;

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get();

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};
