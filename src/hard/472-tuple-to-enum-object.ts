/**
 * 472 - Tuple to Enum Object
 *
 * In this question, the type should convert a given string tuple to an object that behaves like an enum.
 * Moreover, the property of an enum is preferably a pascal case.
 * If `true` is given in the second argument, the value should be a number literal.
 */

/* _____________ Your Code Here _____________ */

type TupleKeys<T> = T extends readonly [infer _, ...infer R]
  ? TupleKeys<R> | R['length']
  : never;

type Enum<T extends readonly string[], N extends boolean = false> = {
  readonly [K in TupleKeys<T> as Capitalize<T[K]>]: N extends true ? K : T[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const OperatingSystem = ['macOS', 'Windows', 'Linux'] as const;
const Command = [
  'echo',
  'grep',
  'sed',
  'awk',
  'cut',
  'uniq',
  'head',
  'tail',
  'xargs',
  'shift',
] as const;

type cases = [
  Expect<Equal<Enum<[]>, {}>>,
  Expect<
    Equal<
      Enum<typeof OperatingSystem>,
      {
        readonly MacOS: 'macOS';
        readonly Windows: 'Windows';
        readonly Linux: 'Linux';
      }
    >
  >,
  Expect<
    Equal<
      Enum<typeof OperatingSystem, true>,
      {
        readonly MacOS: 0;
        readonly Windows: 1;
        readonly Linux: 2;
      }
    >
  >,
  Expect<
    Equal<
      Enum<typeof Command>,
      {
        readonly Echo: 'echo';
        readonly Grep: 'grep';
        readonly Sed: 'sed';
        readonly Awk: 'awk';
        readonly Cut: 'cut';
        readonly Uniq: 'uniq';
        readonly Head: 'head';
        readonly Tail: 'tail';
        readonly Xargs: 'xargs';
        readonly Shift: 'shift';
      }
    >
  >,
  Expect<
    Equal<
      Enum<typeof Command, true>,
      {
        readonly Echo: 0;
        readonly Grep: 1;
        readonly Sed: 2;
        readonly Awk: 3;
        readonly Cut: 4;
        readonly Uniq: 5;
        readonly Head: 6;
        readonly Tail: 7;
        readonly Xargs: 8;
        readonly Shift: 9;
      }
    >
  >
];
