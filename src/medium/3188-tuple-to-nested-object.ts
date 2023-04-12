/**
 * 3188 - Tuple to Nested Object
 *
 * Given a tuple type ```T``` that only contains string type, and a type ```U```, build an object recursively.
 */

/* _____________ Your Code Here _____________ */

type TupleToNestedObject<T extends unknown[], U> = T extends [
  infer F,
  ...infer R
]
  ? {
      [P in F & string]: TupleToNestedObject<R, U>;
    }
  : U;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<
    Equal<
      TupleToNestedObject<['a', 'b', 'c'], boolean>,
      { a: { b: { c: boolean } } }
    >
  >,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
];
