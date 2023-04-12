/**
 * 2828 - ClassPublicKeys
 *
 * Implement the generic `ClassPublicKeys<T>` which returns all public keys of a class.
 */

/* _____________ Your Code Here _____________ */

type ClassPublicKeys<C> = keyof C;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

class A {
  public str: string;
  protected num: number;
  private bool: boolean;
  constructor() {
    this.str = 'naive';
    this.num = 19260917;
    this.bool = true;
  }

  getNum() {
    return Math.random();
  }
}

type cases = [Expect<Equal<ClassPublicKeys<A>, 'str' | 'getNum'>>];
