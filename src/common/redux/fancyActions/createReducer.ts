import { Reducer } from "redux";
import { Type } from "../../typescript";
import produce from "immer"
import { Actions } from "./actions";
import { getPossibleActionHandlers, getActionType } from "./internals";

type GetState<TActions> = TActions extends Actions<infer TState>
    ? TState
    : never;

export function createReducer<TActions extends Actions<TState>, TState>(
    actionsType: Type<TActions>
): Reducer<GetState<TActions>> {
    const actions = new actionsType() as any;
    const actionTypeToMethodNameMap = getActionMap(actions, actionsType);

    return (state: TState = actions.initialState, action) => {
        const methodName = actionTypeToMethodNameMap.get(action.type);
        if (methodName == null) {
            return state;
        }

        if (!(methodName in actions)) {
            return state;
        }

        return produce(state, draftState => {
            actions.state = draftState;
            actions[methodName](action.payload);
            const newDraftState = actions.state;
            actions.state = undefined;
            return newDraftState;
        });
    }
}

function getActionMap(actions: any, actionsType: Type<any>) {
    const methodNames = getPossibleActionHandlers(actions);
    return new Map(methodNames.map(methodName => [getActionType(actionsType, methodName), methodName]));
}
