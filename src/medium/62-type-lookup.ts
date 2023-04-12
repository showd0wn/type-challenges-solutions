/**
 * 62 - Type Lookup
 */

/* _____________ 你的代码 _____________ */

type LookUp<U, T extends string> = U extends { type: T } ? U : never;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type Animal = Cat | Dog;

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>
];
