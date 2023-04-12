/**
 * 9155 - ValidDate
 *
 * Implement a type `ValidDate`, which takes an input type T and returns whether T is a valid date.
 * Leap year is not considered
 */

/* _____________ Your Code Here _____________ */

type Num = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type MM = `0${Num}` | `1${0 | 1 | 2}`;

type AllDate =
  | `${MM}${`0${Num}` | `1${0 | Num}` | `2${0 | Exclude<Num, 9>}`}`
  | `${Exclude<MM, '02'>}${29 | 30}`
  | `${Exclude<MM, '02' | '04' | '06' | '09' | '11'>}${31}`;

type ValidDate<T extends string> = T extends AllDate ? true : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<ValidDate<'0102'>, true>>,
  Expect<Equal<ValidDate<'0131'>, true>>,
  Expect<Equal<ValidDate<'1231'>, true>>,
  Expect<Equal<ValidDate<'0229'>, false>>,
  Expect<Equal<ValidDate<'0100'>, false>>,
  Expect<Equal<ValidDate<'0132'>, false>>,
  Expect<Equal<ValidDate<'1301'>, false>>
];
