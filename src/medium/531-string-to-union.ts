/**
 * 531 - String to Union
 *
 * 实现一个将接收到的 String 参数转换为一个字母 Union 的类型
 */

/* _____________ 你的代码 _____________ */

// type StringToUnion<
//   T extends string,
//   U extends string[] = []
// > = T extends `${infer X}${infer Y}` ? StringToUnion<Y, [...U, X]> : U[number];

type StringToUnion<T extends string> = T extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : never;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<
    Equal<
      StringToUnion<'coronavirus'>,
      'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'
    >
  >
];
