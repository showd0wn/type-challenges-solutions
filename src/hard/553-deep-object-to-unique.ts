/**
 * 553 - Deep object to unique
 *
 * TypeScript has structural type system, but sometimes you want a function to accept only some previously well-defined unique objects (as in the nominal type system), and not any objects that have the required fields.
 * Create a type that takes an object and makes it and all deeply nested objects in it unique, while preserving the string and numeric keys of all objects, and the values of all properties on these keys.
 * The original type and the resulting unique type must be mutually assignable, but not identical.
 */

/* _____________ Your Code Here _____________ */

// type DeepObjectToUniq<O extends object> = any;

const symbol = Symbol();
type DeepObjectToUniq<O extends object, Path extends unknown[] = [O]> = {
  [K in keyof O]: O[K] extends object
    ? DeepObjectToUniq<O[K], [...Path, K]>
    : O[K];
} & { [symbol]?: Path };

/* _____________ Test Cases _____________ */
import type { Equal, IsFalse, IsTrue } from '@type-challenges/utils';

type Quz = { quz: 4 };

type Foo = { foo: 2; baz: Quz; bar: Quz };
type Bar = { foo: 2; baz: Quz; bar: Quz & { quzz?: 0 } };

type UniqFoo = DeepObjectToUniq<Foo>;
type UniqBar = DeepObjectToUniq<Bar>;

declare let foo: Foo;
declare let uniqFoo: UniqFoo;

uniqFoo = foo;
foo = uniqFoo;

type cases = [
  IsFalse<Equal<UniqFoo, Foo>>,
  IsTrue<Equal<UniqFoo['foo'], Foo['foo']>>,
  IsTrue<Equal<UniqFoo['bar']['quz'], Foo['bar']['quz']>>,
  IsFalse<Equal<UniqFoo['bar'], UniqFoo['baz']>>,
  IsFalse<Equal<UniqBar['baz'], UniqFoo['baz']>>,
  IsTrue<Equal<keyof UniqBar['baz'], keyof UniqFoo['baz']>>,
  IsTrue<Equal<keyof Foo, keyof UniqFoo & string>>
];
