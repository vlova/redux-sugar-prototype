import { Draft } from "immer";
import { DeepReadonly } from "ts-essentials";

export abstract class Actions<TState> {
    protected state!: Draft<TState>;
    abstract readonly initialState: DeepReadonly<TState>;
}
