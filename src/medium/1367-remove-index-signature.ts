/**
 * 1367 - Remove Index Signature
 *
 * Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.
 */

/* _____________ Your Code Here _____________ */

type ExcludeIndexSignature<T, P extends keyof T> = P extends `${infer R}`
  ? R
  : never;

type RemoveIndexSignature<T> = {
  [P in keyof T as ExcludeIndexSignature<T, P>]: T[P];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Foo = {
  [key: string]: any;
  foo(): void;
};

type Bar = {
  [key: number]: any;
  bar(): void;
};

type FooBar = {
  [key: symbol]: any;
  foobar(): void;
};

type Baz = {
  bar(): void;
  baz: string;
};

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { foobar(): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>
];
