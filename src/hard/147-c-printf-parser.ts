/**
 * 147 - C-printf Parser
 *
 * This challenge requires you to parse the input string and extract the format placeholders like `%d` and `%f`. For example, if the input string is `"The result is %d."`, the parsed result is a tuple `['dec']`.
 */

/* _____________ Your Code Here _____________ */

type ControlsMap = {
  c: 'char';
  s: 'string';
  d: 'dec';
  o: 'oct';
  h: 'hex';
  f: 'float';
  p: 'pointer';
};

type ParsePrintFormat<
  S extends string,
  PRE extends string = '',
  RTN extends string[] = []
> = S extends `${infer F}${infer R}`
  ? PRE extends '%'
    ? F extends keyof ControlsMap
      ? ParsePrintFormat<R, '', [...RTN, ControlsMap[F]]>
      : ParsePrintFormat<R, '', RTN>
    : ParsePrintFormat<R, F, RTN>
  : RTN;

// type ParsePrintFormat<
//   S extends string,
//   P extends string = ''
// > = S extends `${infer F}${infer R}`
//   ? P extends '%'
//     ? F extends keyof ControlsMap
//       ? [ControlsMap[F], ...ParsePrintFormat<R>]
//       : ParsePrintFormat<R>
//     : ParsePrintFormat<R, F>
//   : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<ParsePrintFormat<''>, []>>,
  Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
  Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
  Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
  Expect<Equal<ParsePrintFormat<'Hello %s: score is %d.'>, ['string', 'dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %'>, []>>
];
