/**
 * 270 - Typed Get
 *
 * The [`get` function in lodash](https://lodash.com/docs/4.17.15#get) is a quite convenient helper for accessing nested values in JavaScript.
 * However, when we come to TypeScript, using functions like this will make you lose the type information.
 * With TS 4.1's upcoming [Template Literal Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#template-literal-types) feature, properly typing `get` becomes possible.
 */

/* _____________ Your Code Here _____________ */

type Get<T, K> = K extends keyof T
  ? T[K]
  : K extends `${infer X}.${infer Y}`
  ? X extends keyof T
    ? Get<T[X], Y>
    : never
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Get<Data, 'hello'>, 'world'>>,
  Expect<Equal<Get<Data, 'foo.bar.count'>, 6>>,
  Expect<Equal<Get<Data, 'foo.bar'>, { value: 'foobar'; count: 6 }>>,

  Expect<Equal<Get<Data, 'no.existed'>, never>>
];

type Data = {
  foo: {
    bar: {
      value: 'foobar';
      count: 6;
    };
    included: true;
  };
  hello: 'world';
};
