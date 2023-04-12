/**
 * 527 - Append to object
 *
 * 实现一个为接口添加一个新字段的类型。该类型接收三个参数，返回带有新字段的接口类型
 */

/* _____________ 你的代码 _____________ */

type AppendToObject<T extends Record<string, unknown>, U extends string, V> = {
  [P in keyof T | U]: P extends keyof T ? T[P] : V;
};

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type test1 = {
  key: 'cat';
  value: 'green';
};

type testExpect1 = {
  key: 'cat';
  value: 'green';
  home: boolean;
};

type test2 = {
  key: 'dog' | undefined;
  value: 'white';
  sun: true;
};

type testExpect2 = {
  key: 'dog' | undefined;
  value: 'white';
  sun: true;
  home: 1;
};

type test3 = {
  key: 'cow';
  value: 'yellow';
  sun: false;
};

type testExpect3 = {
  key: 'cow';
  value: 'yellow';
  sun: false;
  isMotherRussia: false | undefined;
};

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<
    Equal<
      AppendToObject<test3, 'isMotherRussia', false | undefined>,
      testExpect3
    >
  >
];
