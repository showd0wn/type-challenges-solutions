/**
 * 612 - KebabCase
 *
 * `FooBarBaz` -> `foo-bar-baz`
 */

/* _____________ Your Code Here _____________ */

type Case<S extends string> = S extends `${infer F}${infer R}`
  ? F extends Lowercase<F>
    ? `${F}${Case<R>}`
    : `-${Lowercase<F>}${Case<R>}`
  : S;

type Sub<S extends string> = S extends `-${infer L}`
  ? L extends ''
    ? '-'
    : L
  : S;

type KebabCase<S extends string> = Sub<Case<S>>;

// type KebabCase<S extends string> = S extends `${infer F}${infer R}`
//   ? R extends Uncapitalize<R>
//     ? Uncapitalize<`${F}${KebabCase<R>}`>
//     : Uncapitalize<`${F}-${KebabCase<R>}`>
//   : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>
];
