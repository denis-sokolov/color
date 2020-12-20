export type Imprecise<Value> = {
  approximation: Value;
  map: <NewValue>(f: (v: Value) => NewValue) => Imprecise<NewValue>;
  precise?: Value;
};

export function makeApproximate<Value>(value: Value): Imprecise<Value> {
  return {
    approximation: value,
    map: (f) => makeApproximate(f(value)),
    precise: undefined,
  };
}

export function makePrecise<Value>(value: Value): Imprecise<Value> {
  return {
    approximation: value,
    map: (f) => makePrecise(f(value)),
    precise: value,
  };
}
