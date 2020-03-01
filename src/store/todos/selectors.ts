import { TodoState, TodoId } from "./state";

const getTodoState = (state: any) => state.todos as TodoState;

export const getTodoItems = (state: any) =>
    getTodoState(state).itemIds;

export const getTodoItem = (id: TodoId) => (state: any) =>
    getTodoState(state).idToItem.get(id);

export const isLastItem = (id: TodoId) => (state: any) =>
    getTodoState(state).itemIds[getTodoState(state).itemIds.length - 1] === id;

