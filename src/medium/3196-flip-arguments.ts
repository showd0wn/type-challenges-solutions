/**
 * 3196 - Flip Arguments
 *
 * Implement the type version of lodash's ```_.flip```.
 * Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.
 */

/* _____________ Your Code Here _____________ */

type Reverse<T extends unknown[], U extends unknown[] = []> = T extends [
  infer F,
  ...infer R
]
  ? Reverse<R, [F, ...U]>
  : U;

type FlipArguments<T extends (...args: any[]) => any> = (
  ...args: Reverse<Parameters<T>>
) => ReturnType<T>;

// type FlipArguments<T extends (...args: any[]) => any> = T extends (
//   ...args: infer P
// ) => infer R
//   ? (...args: Reverse<P>) => R
//   : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<
    Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>
  >,
  Expect<
    Equal<
      FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
      (arg0: boolean, arg1: number, arg2: string) => void
    >
  >
];
