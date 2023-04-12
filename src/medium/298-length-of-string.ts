/**
 * 298 - Length of String
 *
 * 计算字符串的长度
 */

/* _____________ 你的代码 _____________ */

type LengthOfString<
  T extends string,
  U extends string[] = []
> = T extends `${infer A}${infer B}`
  ? LengthOfString<B, [...U, A]>
  : U['length'];

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>
];
