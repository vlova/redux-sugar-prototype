export type Type<T> = new () => T;

export type UnionToXor<U>
    = (U extends any ? (k: U) => U : never) extends (k: any) => void ? U : never;
