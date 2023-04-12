/**
 * 925 - Assert Array Index
 */

/* _____________ Your Code Here _____________ */

type Num = ReadonlyArray<0>;
type N0 = readonly [];
type N1 = readonly [0];
type N2 = readonly [0, 0];
type N3 = readonly [0, 0, 0];
type N4 = readonly [0, 0, 0, 0];
type N5 = readonly [0, 0, 0, 0, 0];
type N6 = readonly [0, 0, 0, 0, 0, 0];
type N7 = readonly [0, 0, 0, 0, 0, 0, 0];
type N8 = readonly [0, 0, 0, 0, 0, 0, 0, 0];
type N9 = readonly [0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * Sum<N3, N4> = N7.
 */
type Sum<N extends Num, M extends Num> = readonly [...N, ...M];

type NA = Sum<N9, N7>;
type NI = Sum<NA, Sum<N9, N5>>;
type NP = Sum<NI, Sum<N9, N8>>;
type NX = Sum<NP, Sum<N9, N4>>;

type Codes = {
  ' ': N7;
  a: Sum<NA, N1>;
  b: Sum<NA, N2>;
  c: Sum<NA, N3>;
  d: Sum<NA, N4>;
  e: Sum<NA, N5>;
  f: Sum<NA, N6>;
  g: Sum<NA, N7>;
  h: Sum<NA, N8>;
  i: Sum<NI, N1>;
  j: Sum<NI, N2>;
  k: Sum<NI, N3>;
  l: Sum<NI, N4>;
  m: Sum<NI, N5>;
  n: Sum<NI, N6>;
  o: Sum<NI, N7>;
  p: Sum<NP, N1>;
  q: Sum<NP, N2>;
  r: Sum<NP, N3>;
  s: Sum<NP, N4>;
  t: Sum<NP, N5>;
  u: Sum<NP, N6>;
  v: Sum<NP, N7>;
  w: Sum<NP, N9>;
  x: Sum<NX, N1>;
  y: Sum<NX, N2>;
  z: Sum<NX, N3>;
};

/**
 * KeyToNum<'ab'> = N74.
 */
type KeyToNum<Key extends string> = Key extends ''
  ? N0
  : Key extends `${infer L}${infer Rest}`
  ? L extends keyof Codes
    ? Sum<Codes[L], KeyToNum<Rest>>
    : never
  : never;

/**
 * IsArray<[0]> = false, IsArray<string[]> = true.
 */
type IsArray<A extends readonly unknown[]> = number extends A['length']
  ? true
  : false;

/**
 * IsKey<'ab x'> = true, IsKey<'key!'> = false.
 */
type IsKey<Key extends string> = Key extends ''
  ? false
  : KeyToNum<Key> extends never
  ? false
  : true;

declare const KEY: unique symbol;
declare const CODE: unique symbol;

/**
 * WithIndex<string, 'foo'> = object with key index 'foo'.
 */
type WithIndex<
  Element,
  Key extends string,
  KeyCode extends number = KeyToNum<Key>['length']
> = KeyCode extends never
  ? never
  : {
      readonly [KEY]: Key;
      readonly [CODE]: KeyCode;
    } & {
      readonly [K in KeyCode]: Element;
    };

/**
 * Index<typeof indexedArray> = index of indexedArray.
 */
type Index<A extends { readonly [CODE]: number }> = A[typeof CODE];

/**
 * assertArrayIndex(arr, 'foo') assert that arr is array with key index 'foo'.
 */
function assertArrayIndex<A extends readonly unknown[], Key extends string>(
  array: IsKey<Key> extends true
    ? IsArray<A> extends true
      ? A
      : never
    : never,
  key: Key
): asserts array is IsKey<Key> extends true
  ? IsArray<A> extends true
    ? A & WithIndex<A[number], Key>
    : never
  : never {}

/* _____________ Test Cases _____________ */
const matrix = [
  [3, 4],
  [5, 6],
  [7, 8],
];

assertArrayIndex(matrix, 'rows');

let sum = 0;

for (let i = 0 as Index<typeof matrix>; i < matrix.length; i += 1) {
  const columns: number[] = matrix[i];

  // @ts-expect-error: number | undefined in not assignable to number
  const x: number[] = matrix[0];

  assertArrayIndex(columns, 'columns');

  for (let j = 0 as Index<typeof columns>; j < columns.length; j += 1) {
    sum += columns[j];

    // @ts-expect-error: number | undefined in not assignable to number
    const y: number = columns[i];

    // @ts-expect-error: number | undefined in not assignable to number
    const z: number = columns[0];

    // @ts-expect-error: number[] | undefined in not assignable to number[]
    const u: number[] = matrix[j];
  }
}

const a: string[] = [];

assertArrayIndex(a, 'a');

for (let p = 0 as Index<typeof a>; p < a.length; p += 1) {
  const value: string = a[p];

  // @ts-expect-error: string | undefined is not assignable to string
  const z: string = a[2];
}

a.push('qux');
// @ts-expect-error: number is not assignable to string
a.push(3);

for (const value of a) {
  const other: string = value;
}

const b: number[] = [];

assertArrayIndex(b, 'b');

for (let p = 0 as Index<typeof a>; p < b.length; p += 1) {
  // @ts-expect-error: number | undefined is not assignable to string
  const value: string = b[p];
}

const c: string[] = [];

assertArrayIndex(c, 'c');

for (let p = 0; p < c.length; p += 1) {
  // @ts-expect-error: string | undefined is not assignable to string
  let value: string = c[p];

  // @ts-expect-error: string | undefined is not assignable to string
  value = c[0 as Index<typeof a>];
}

const d: readonly number[] = [];

assertArrayIndex(d, 'd');

for (let p = 0 as Index<typeof d>; p < d.length; p += 1) {
  const value: number = d[p];

  // @ts-expect-error: only permits reading
  d[2] = 3;
}

// @ts-expect-error: push does not exist on readonly
d.push(3);

const e: [number] = [0];

// @ts-expect-error: [number] is not assignable to never
assertArrayIndex(e, 'e');

const f: readonly [boolean] = [false];

// @ts-expect-error: [boolean] is not assignable to never
assertArrayIndex(f, 'f');

const tuple = [5, 7] as const;

// @ts-expect-error: readonly [5, 7] is not assignable to never
assertArrayIndex(tuple, 'tuple');
