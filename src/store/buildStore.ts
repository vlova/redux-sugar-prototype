import { createStore, combineReducers } from "redux";
import { todoReducer } from "./todos/actions";
import { devToolsEnhancer } from 'redux-devtools-extension';

export function buildStore() {
    return createStore(
        combineReducers({
            todos: todoReducer
        }),
        devToolsEnhancer({
            serialize: true,
            trace: true,
        }));
}