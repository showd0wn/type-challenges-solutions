/**
 * 2595 - PickByType
 *
 * From `T`, pick a set of properties whose type are assignable to `U`.
 */

/* _____________ Your Code Here _____________ */

type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: U;
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface Model {
  name: string;
  count: number;
  isReadonly: boolean;
  isEnable: boolean;
}

type cases = [
  Expect<
    Equal<
      PickByType<Model, boolean>,
      { isReadonly: boolean; isEnable: boolean }
    >
  >,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>
];
