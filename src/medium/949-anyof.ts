/**
 * 949 - AnyOf
 *
 * 在类型系统中实现类似于 Python 中 `any` 函数
 */

/* _____________ 你的代码 _____________ */

// type isFalse<T> = T extends false | 0 | '' | []
//   ? true
//   : keyof T extends never
//   ? true
//   : false;

type isFalse<T> = T extends 0
  ? true
  : '' extends T
  ? true
  : [] extends T
  ? true
  : {} extends T
  ? true
  : T extends false
  ? true
  : false;

type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer R]
  ? true extends isFalse<F>
    ? AnyOf<R>
    : true
  : false;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<
    Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[0, '', false, [], {}]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>
];
