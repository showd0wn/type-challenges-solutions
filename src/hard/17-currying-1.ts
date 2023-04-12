/**
 * 17 - 柯里化 1
 */

/* _____________ 你的代码 _____________ */

declare function Currying<T>(fn: T): Curried<T>;

type Curried<T> = T extends (...args: infer P) => infer R
  ? P extends [infer X, ...infer Y]
    ? (args: X) => Curried<(...args: Y) => R>
    : R
  : never;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const curried1 = Currying((a: string, b: number, c: boolean) => true);
const curried2 = Currying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean
  ) => true
);

type cases = [
  Expect<
    Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>
  >,
  Expect<
    Equal<
      typeof curried2,
      (
        a: string
      ) => (
        b: number
      ) => (
        c: boolean
      ) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >
  >
];
