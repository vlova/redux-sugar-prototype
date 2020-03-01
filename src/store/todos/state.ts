import { Opaque } from "ts-essentials";

export type TodoId = Opaque<string, "todo-id">;

export interface TodoItem {
    id: TodoId;
    text: string;
    isCompleted: boolean;
}

export interface TodoState {
    itemIds: TodoId[];
    idToItem: Map<TodoId, TodoItem>;
}
