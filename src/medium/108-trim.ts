/**
 * 108 - Trim
 *
 * 实现 `Trim<T>`，它是一个字符串类型，并返回一个新字符串，其中两端的空白符都已被删除
 */

/* _____________ 你的代码 _____________ */

type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}`
  ? TrimLeft<R>
  : S;

type TrimRight<S extends string> = S extends `${infer L}${' ' | '\n' | '\t'}`
  ? TrimRight<L>
  : S;

type Trim<S extends string> = TrimLeft<TrimRight<S>>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>
];
