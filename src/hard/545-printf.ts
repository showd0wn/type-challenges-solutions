/**
 * 545 - printf
 */

/* _____________ Your Code Here _____________ */

// type FormatMap = {
//   s: string;
//   d: number;
// };

// type Format<
//   T extends string,
//   P extends string = ''
// > = T extends `${infer F}${infer R}`
//   ? P extends '%'
//     ? F extends keyof FormatMap
//       ? (args: FormatMap[F]) => Format<R, F>
//       : Format<R, F>
//     : Format<R, F>
//   : string;

type Format<T extends string> =
  T extends `${infer _}%${infer Letter}${infer Rest}`
    ? Letter extends 's'
      ? (args: string) => Format<Rest>
      : Letter extends 'd'
      ? (args: number) => Format<Rest>
      : string
    : string;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>
];
