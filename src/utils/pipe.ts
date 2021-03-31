type PipeFn<A, R> = (arg: A, ...fns: any[]) => R;

const pipe: PipeFn<any, any> = (x, ...fns: any[]) =>
  fns.reduce((v, f) => f(v), x);

export default pipe;
