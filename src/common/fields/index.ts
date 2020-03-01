import { Action } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";

export type FieldDefinition<TParams, TValue> = {
    makeSelector: (params: TParams) => (state: any) => TValue;
    makeUpdateAction: (params: TParams) => (value: TValue) => Action;
}

export function makeEntityFields<
    TEntity, TParams,
    TPayload,
    TWantedKey extends keyof TEntity
>(def: {
    makeSelector: (params: TParams) => (state: any) => TEntity | undefined;
    paramsToPayload: (params: TParams) => TPayload,
    makeUpdateAction: (p: { field: TWantedKey, value: any } & TPayload) => Action;
    fields: TWantedKey[]
}): { [P in TWantedKey]: FieldDefinition<TParams, TEntity[P]> } {
    const response: any = {};
    for (const field of def.fields) {
        const fieldDef = makeFieldDefinition({
            makeSelector: (params: TParams) => state => def.makeSelector(params)(state)?.[field],
            makeUpdateAction: (params: TParams) => value => def.makeUpdateAction({
                ...def.paramsToPayload(params),
                field,
                value
            })
        });

        response[field] = fieldDef;
    }

    return response;
}

export function makeFieldDefinition<TParams, TValue>(def: FieldDefinition<TParams, TValue>) {
    return def;
}

export function useField<TParams, TValue>(
    def: FieldDefinition<TParams, TValue>, params: TParams
): [TValue, (value: TValue) => void] {
    const selector = useMemo(
        () => def.makeSelector(params),
        [def, params]);

    const value = useSelector(selector);
    const dispatch = useDispatch();
    const updateValue = useCallback(
        (value: TValue) => dispatch(def.makeUpdateAction(params)(value)),
        [def, params, dispatch]
    );

    return [value, updateValue];
}