/**
 * 4037 - IsPalindrome
 */

/* _____________ Your Code Here _____________ */

type Reverse<S extends string | number> = `${S}` extends `${infer X}${infer Y}`
  ? `${Reverse<Y>}${X}`
  : '';

type IsPalindrome<T extends string | number> = `${T}` extends Reverse<T>
  ? true
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>
];
