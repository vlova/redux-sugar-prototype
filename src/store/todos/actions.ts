import { Actions, createActionMap, createReducer, generateId } from "../../common/redux";
import { assert } from 'ts-essentials';
import { TodoState, TodoId, TodoItem } from "./state";

class TodoActions extends Actions<TodoState> {
    initialState: TodoState = {
        itemIds: [],
        idToItem: new Map(),
    };

    add() {
        const id = generateId<TodoId>();
        this.state.itemIds.push(id);
        this.state.idToItem.set(id, {
            id: generateId<TodoId>(),
            text: '',
            isCompleted: false
        });
    }

    updateFieldUnsafe({ id, field, value }: {
        id: TodoId,
        field: 'text' | 'isCompleted',
        value: TodoItem[typeof field]
    }) {
        const item = this.#findItem(id);
        (item as any)[field] = value;
    }

    delete({ id }: { id: TodoId }) {
        if (this.state.itemIds.length === 1) {
            const item = this.#findItem(id);
            item.text = '';
            item.isCompleted = false;
        } else {
            this.state.itemIds.splice(this.state.itemIds.indexOf(id), 1);
            this.state.idToItem.delete(id);
        }
    }

    #findItem = (id: TodoId) => {
        const item = this.state.idToItem.get(id);
        assert(item != null, "item not found");
        return item;
    }
}

export const todoActions = createActionMap(TodoActions);
export const todoReducer = createReducer(TodoActions);