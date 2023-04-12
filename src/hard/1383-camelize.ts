/**
 * 1383 - Camelize
 *
 * Implement Camelize which converts object from snake_case to to camelCase
 */

/* _____________ Your Code Here _____________ */

type Camelcase<S> = S extends `${infer X}_${infer Y}`
  ? `${X}${Capitalize<Camelcase<Y>>}`
  : S;

type Camelize<T> = T extends object
  ? T extends unknown[]
    ? { [P in keyof T]: Camelize<T[P]> }
    : { [P in keyof T as Camelcase<P>]: Camelize<T[P]> }
  : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<
      Camelize<{
        some_prop: string;
        prop: { another_prop: string };
        array: [{ snake_case: string }];
      }>,
      {
        someProp: string;
        prop: { anotherProp: string };
        array: [{ snakeCase: string }];
      }
    >
  >
];
