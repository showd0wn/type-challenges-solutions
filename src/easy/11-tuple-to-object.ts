/**
 * 11 - 元组转换为对象
 *
 * 传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历而来
 */

/* _____________ 你的代码 _____________ */

type TupleToObject<T extends readonly (number | string)[]> = {
  [K in T[number]]: K;
};

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: 'tesla';
        'model 3': 'model 3';
        'model X': 'model X';
        'model Y': 'model Y';
      }
    >
  >
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;
