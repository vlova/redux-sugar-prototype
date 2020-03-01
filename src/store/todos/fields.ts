import { makeEntityFields } from "../../common/fields";
import { getTodoItem } from "./selectors";
import { todoActions } from "./actions";

export const todoItemFields = makeEntityFields({
    makeSelector: getTodoItem,
    makeUpdateAction: todoActions.updateFieldUnsafe,
    paramsToPayload: id => ({ id }),
    fields: [
        'text',
        'isCompleted'
    ]
});

