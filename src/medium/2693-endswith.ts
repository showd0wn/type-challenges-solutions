/**
 * 2693 - EndsWith
 *
 * Implement `EndsWith<T, U>` which takes two exact string types and returns whether `T` ends with `U`
 */

/* _____________ Your Code Here _____________ */

type EndsWith<T extends string, U extends string> = T extends `${infer _}${U}`
  ? true
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

type cases = [
  Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'd'>, false>>
];
