/**
 * 114 - CamelCase
 *
 * Implement `CamelCase<T>` which converts `snake_case` string to `camelCase`.
 */

/* _____________ Your Code Here _____________ */

type CamelCase<
  S extends string,
  PRE extends string = '',
  RTN extends string = ''
> = S extends `${infer F}${infer R}`
  ? F extends '_'
    ? CamelCase<R, '_', RTN>
    : PRE extends '_'
    ? CamelCase<R, F, `${RTN}${Uppercase<F>}`>
    : CamelCase<R, F, `${RTN}${Lowercase<F>}`>
  : RTN;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>
];
