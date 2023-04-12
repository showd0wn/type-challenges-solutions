/**
 * 2688 - StartsWith
 *
 * Implement `StartsWith<T, U>` which takes two exact string types and returns whether `T` starts with `U`
 */

/* _____________ Your Code Here _____________ */

type StartsWith<T extends string, U extends string> = T extends `${U}${infer _}`
  ? true
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

type cases = [
  Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abcd'>, false>>
];
