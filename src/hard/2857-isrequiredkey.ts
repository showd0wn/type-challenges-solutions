/**
 * 2857 - IsRequiredKey
 *
 * Implement a generic ```IsRequiredKey<T, K>```  that return whether ```K``` are required keys of ```T``` .
 */

/* _____________ Your Code Here _____________ */

type GetRequiredKey<T> = keyof {
  [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P];
};

type IsRequiredKey<T, K extends keyof T> = Exclude<
  K,
  GetRequiredKey<T>
> extends never
  ? true
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>
];
