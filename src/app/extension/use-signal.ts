import { signal, WritableSignal } from '@angular/core';

export type CreateSignal = {
  /**
   */
  <T>(initialValue: T | (() => T)): WritableSignal<T>;
  /**
  // convenience overload when first argument is omitted
  */
  <T>(): WritableSignal<T | undefined>;
};

const createSignalImpl: CreateSignal = <S>(
  initialState?: S | (() => S)
): WritableSignal<S | undefined> => {
  if (typeof initialState === 'function') {
    return signal((initialState as () => S)());
  }
  return signal(initialState);
};

export const useSignal = createSignalImpl;
