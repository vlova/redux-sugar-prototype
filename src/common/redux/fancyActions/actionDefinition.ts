import { Action } from "redux";

type ActionDefinitionNoParams
    = (() => Action)
    & {
        readonly is: (action: Action) => action is Action
    };

type ActionDefinitionParams<TParams>
    = ((params: TParams) => Action)
    & {
        readonly is: (action: Action) => action is Action & { payload: TParams }
    }

export type ActionDefinition<TParams> = [TParams] extends [never] // [] is used to prevent 'never' to be distributive
    ? ActionDefinitionNoParams
    : ActionDefinitionParams<TParams>;
