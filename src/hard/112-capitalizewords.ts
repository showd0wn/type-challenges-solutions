/**
 * 112 - Capitalize Words
 *
 * Implement `CapitalizeWords<T>` which converts the first letter of **each word of a string** to uppercase and leaves the rest as-is.
 */

/* _____________ Your Code Here _____________ */

type Separator = ' ' | ',' | '.';

type CapitalizeWords<
  S extends string,
  PRE extends string = ' ',
  RTN extends string = ''
> = S extends `${infer F}${infer R}`
  ? PRE extends Separator
    ? CapitalizeWords<R, F, `${RTN}${Uppercase<F>}`>
    : CapitalizeWords<R, F, `${RTN}${F}`>
  : RTN;

// type CapitalizeWords<S extends string> = S extends `${infer X} ${infer Y}`
//   ? `${Capitalize<X>} ${CapitalizeWords<Y>}`
//   : S extends `${infer X}.${infer Y}`
//   ? `${Capitalize<X>}.${CapitalizeWords<Y>}`
//   : S extends `${infer X},${infer Y}`
//   ? `${Capitalize<X>},${CapitalizeWords<Y>}`
//   : Capitalize<S>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>
];
