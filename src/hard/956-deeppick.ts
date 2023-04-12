/**
 * 956 - DeepPick
 */

/* _____________ Your Code Here _____________ */

type UnionToIntersection<U> = (
  U extends any ? (args: U) => void : never
) extends (args: infer I) => void
  ? I
  : never;

type MyPick<
  O extends Record<string, any>,
  S extends string
> = S extends `${infer F}.${infer R}`
  ? {
      [P in F]: MyPick<O[P], R>;
    }
  : S extends keyof O
  ? Pick<O, S>
  : unknown;

type DeepPick<O, S extends string> = UnionToIntersection<MyPick<O, S>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Obj = {
  a: number;
  b: string;
  c: boolean;
  obj: {
    d: number;
    e: string;
    f: boolean;
    obj2: {
      g: number;
      h: string;
      i: boolean;
    };
  };
  obj3: {
    j: number;
    k: string;
    l: boolean;
  };
};

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<
    Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>
  >,
  Expect<
    Equal<
      DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>,
      { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }
    >
  >
];
