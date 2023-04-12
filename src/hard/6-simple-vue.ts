/**
 * 6 - 简单的 Vue 类型
 */

/* _____________ 你的代码 _____________ */

declare function SimpleVue<D, C, M>(options: Options<D, C, M>): any;

type Computed<T> = {
  [P in keyof T]: T[P] extends () => infer R ? R : never;
};

// https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype
type Options<D, C, M> = {
  data: (this: {}) => D;
  computed: C & ThisType<D & Computed<C> & M>;
  methods: M & ThisType<D & Computed<C> & M>;
};

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname;
    // @ts-expect-error
    this.getRandom();
    // @ts-expect-error
    this.data();

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
  },
  methods: {
    getRandom() {
      return Math.random();
    },
    hi() {
      alert(this.amount);
      alert(this.fullname.toLowerCase());
      alert(this.getRandom());
    },
    test() {
      const fullname = this.fullname;
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any;
    },
  },
});
