/**
 * 2949 - ObjectFromEntries
 *
 * Implement the type version of ```Object.fromEntries```
 */

/* _____________ Your Code Here _____________ */
// 55 - Union to Intersection
type UnionToIntersection<U> = (
  U extends any ? (args: U) => void : never
) extends (args: infer I) => void
  ? I
  : never;

type ObjectFromEntriesUnion<T> = T extends [infer A, infer B]
  ? {
      [K in A & string]: B;
    }
  : never;

type Picked<T> = {
  [K in keyof T]: T[K];
};

type ObjectFromEntries<T> = Picked<
  UnionToIntersection<ObjectFromEntriesUnion<T>>
>;

// type ObjectFromEntries<T extends [string, unknown]> = {
//   [A in T as A[0]]: A[1];
// };

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries =
  | ['name', string]
  | ['age', number]
  | ['locations', string[] | null];

type cases = [Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>];
