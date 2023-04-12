/**
 * 1290 - Pinia
 *
 * Create a type-level function whose types is similar to [Pinia](https://github.com/posva/pinia) library.
 * You don't need to implement function actually, just adding types.
 */

/* _____________ Your Code Here _____________ */

type Getters<T> = {
  readonly [P in keyof T]: T[P] extends () => infer R ? R : never;
};

type Store<S, G, A> = {
  id: string;
  state: () => S;
  getters: G & ThisType<Readonly<S> & Getters<G>>;
  actions: A & ThisType<S & A & Getters<G>>;
};

declare function defineStore<S, G, A>(
  store: Store<S, G, A>
): Readonly<S> & A & Getters<G>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const store = defineStore({
  id: '',
  state: () => ({
    num: 0,
    str: '',
  }),
  getters: {
    stringifiedNum() {
      // @ts-expect-error
      this.num += 1;

      return this.num.toString();
    },
    parsedNum() {
      return parseInt(this.stringifiedNum);
    },
  },
  actions: {
    init() {
      this.reset();
      this.increment();
    },
    increment(step = 1) {
      this.num += step;
    },
    reset() {
      this.num = 0;

      // @ts-expect-error
      this.parsedNum = 0;

      return true;
    },
    setNum(value: number) {
      this.num = value;
    },
  },
});

// @ts-expect-error
store.nopeStateProp;
// @ts-expect-error
store.nopeGetter;
// @ts-expect-error
store.stringifiedNum();
store.init();
// @ts-expect-error
store.init(0);
store.increment();
store.increment(2);
// @ts-expect-error
store.setNum();
// @ts-expect-error
store.setNum('3');
store.setNum(3);
const r = store.reset();

type _tests = [
  Expect<Equal<typeof store.num, number>>,
  Expect<Equal<typeof store.str, string>>,
  Expect<Equal<typeof store.stringifiedNum, string>>,
  Expect<Equal<typeof store.parsedNum, number>>,
  Expect<Equal<typeof r, true>>
];
