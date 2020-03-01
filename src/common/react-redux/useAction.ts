import { ActionDefinition } from "../redux";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

export function useAction(action: ActionDefinition<never>): () => void
export function useAction<TParams>(
    action: ActionDefinition<TParams>
): (params: TParams) => void
export function useAction(action: any) {
    const dispatch = useDispatch();
    return useCallback((...args: any[]) => dispatch(action(...args)), [dispatch, action]);
}