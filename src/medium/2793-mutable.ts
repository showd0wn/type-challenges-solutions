/**
 * 2793 - Mutable
 *
 * Implement the generic ```Mutable<T>``` which makes all properties in ```T``` mutable (not readonly).
 */

/* _____________ Your Code Here _____________ */

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

type List = [1, 2, 3];

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>
];
