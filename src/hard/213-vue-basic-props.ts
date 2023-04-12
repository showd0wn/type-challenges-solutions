/**
 * 213 - Vue Basic Props
 */

/* _____________ Your Code Here _____________ */

type InferComputed<T> = {
  [P in keyof T]: T[P] extends () => infer R ? R : never;
};
type Prop<T = any> = PropType<T> | { type?: PropType<T> };
type PropType<T> = PropConstructor<T> | PropConstructor<T>[];
type PropConstructor<T = any> =
  | { new (...args: any[]): T & object }
  | { (): T };

type InferPropType<P> = P extends Prop<infer T>
  ? unknown extends T
    ? any
    : T
  : any;
type InferProps<P> = {
  [K in keyof P]: InferPropType<P[K]>;
};

declare function VueBasicProps<P, D, C, M, Props = InferProps<P>>(options: {
  props?: P;
  data(this: Props): D;
  computed: C & ThisType<Props & D & InferComputed<C> & M>;
  methods: M & ThisType<Props & D & InferComputed<C> & M>;
}): any;

/* _____________ Test Cases _____________ */
import type { Debug, Equal, Expect, IsAny } from '@type-challenges/utils';

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>;
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>
    ];

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
      alert(this.fullname.toLowerCase());
      alert(this.getRandom());
    },
    test() {
      const fullname = this.fullname;
      const propE = this.propE;
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>
      ];
    },
  },
});
