/**
 * 645 - Diff
 *
 * 获取两个接口类型中的差值属性
 */

/* _____________ 你的代码 _____________ */

type Diff<
  O extends Record<string, unknown>,
  O1 extends Record<string, unknown>
> = {
  [P in
    | Exclude<keyof O, keyof O1>
    | Exclude<keyof O1, keyof O>]: P extends keyof O
    ? O[P]
    : P extends keyof O1
    ? O1[P]
    : never;
};

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];
