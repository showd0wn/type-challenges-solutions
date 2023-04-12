/**
 * 3326 - BEM style string
 */

/* _____________ Your Code Here _____________ */

type BE<B extends string, E extends string[]> = E extends []
  ? B
  : `${B}__${E[number]}`;

type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = M extends [] ? BE<B, E> : `${BE<B, E>}--${M[number]}`;

// type BEM<
//   B extends string,
//   E extends string[],
//   M extends string[]
// > = E extends []
//   ? M extends []
//     ? B
//     : `${B}--${M[number]}`
//   : M extends []
//   ? `${B}__${E[number]}`
//   : `${B}__${E[number]}--${M[number]}`;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<
    Equal<
      BEM<'btn', ['price'], ['warning', 'success']>,
      'btn__price--warning' | 'btn__price--success'
    >
  >,
  Expect<
    Equal<
      BEM<'btn', [], ['small', 'medium', 'large']>,
      'btn--small' | 'btn--medium' | 'btn--large'
    >
  >
];
