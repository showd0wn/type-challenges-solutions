/**
 * 8767 - Combination
 *
 * Given an array of strings, do Permutation & Combination.
 */

/* _____________ Your Code Here _____________ */

// 参考 4260 - AllCombinations
type AllCombinations<
  T extends string[],
  A extends string = T[number],
  B extends string = A
> = [A] extends [never]
  ? ''
  : A extends any
  ?
      | `${A} ${AllCombinations<T, Exclude<B, A>>}`
      | `${AllCombinations<T, Exclude<B, A>>}`
  : never;

type TrimRight<S extends string> = S extends `${infer L}${' ' | '\n' | '\t'}`
  ? TrimRight<L>
  : S;

type Combination<T extends string[]> = Exclude<
  TrimRight<AllCombinations<T>>,
  ''
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<
      Combination<['foo', 'bar', 'baz']>,
      | 'foo'
      | 'bar'
      | 'baz'
      | 'foo bar'
      | 'foo bar baz'
      | 'foo baz'
      | 'foo baz bar'
      | 'bar foo'
      | 'bar foo baz'
      | 'bar baz'
      | 'bar baz foo'
      | 'baz foo'
      | 'baz foo bar'
      | 'baz bar'
      | 'baz bar foo'
    >
  >
];
