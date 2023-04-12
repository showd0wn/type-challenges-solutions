/**
 * 2946 - ObjectEntries
 *
 * Implement the type version of ```Object.entries```
 */

/* _____________ Your Code Here _____________ */

type RemoveUndefined<T> = [T] extends [undefined] ? T : Exclude<T, undefined>;

type ObjectEntries<T, P = keyof T> = P extends keyof T
  ? [P, RemoveUndefined<T[P]>]
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries =
  | ['name', string]
  | ['age', number]
  | ['locations', string[] | null];

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>
];
