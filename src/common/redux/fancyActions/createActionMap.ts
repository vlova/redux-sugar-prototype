import { Action } from "redux";
import { Type } from "../../typescript";
import { NonNever } from "ts-essentials";
import { Actions } from "./actions";
import { getPossibleActionHandlers, getActionType } from "./internals";
import { ActionDefinition } from "./actionDefinition";

type MappedAction<TActionFunc>
    = TActionFunc extends () => void
    ? ActionDefinition<never>
    : (TActionFunc extends (params: infer TParams) => void
        ? ActionDefinition<TParams>
        : (
            TActionFunc extends (...args: any) => void
            ? () => never
            : never
        )
    );

type MappedActions<TActions extends Actions<unknown>>
    = NonNever<{
        readonly [P in keyof TActions]: MappedAction<TActions[P]>
    }>;

export function createActionMap<TActions extends Actions<unknown>>(
    actionsType: Type<TActions>
): MappedActions<TActions> {
    const mappedActions: any = {};

    const actions = new actionsType() as any;
    for (const key of getPossibleActionHandlers(actions)) {
        const actionType = getActionType(actionsType, key);

        const actionDefinition: any = (params: any, ...args: any[]) => {
            if (args.length > 0) {
                throw new Error('too much arguments');
            }

            return ({
                type: actionType,
                payload: params
            })
        };

        actionDefinition.is = (action: Action) => action.type === actionType;

        mappedActions[key] = actionDefinition;
    }

    return mappedActions;
}