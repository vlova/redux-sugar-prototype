import React, { useCallback } from 'react';
import styles from './TodoItemView.module.css';
import { todoActions, TodoId, todoItemFields, isLastItem } from '../store/todos';
import { useAction } from '../common/react-redux';
import { TextField } from '../common/ui';
import { useField } from '../common/fields';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { TodoItemToggleView } from './TodoItemToggleView';

export const TodoItemView = ({ id }: { id: TodoId }) => {
    const isLast = useSelector(isLastItem(id));

    const addNew = useAction(todoActions.add);
    const deleteItem = useAction(todoActions.delete);
    const [text, updateText] = useField(todoItemFields.text, id);
    const [isCompleted, updateIsCompleted] = useField(todoItemFields.isCompleted, id);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                updateIsCompleted(!isCompleted);
                return;
            }

            if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
                if (isLast) {
                    addNew();
                }

                return;
            }

            if ((e.key === 'Delete' || e.key === 'Backspace') && e.ctrlKey) {
                deleteItem({ id });
                return;
            }
        },
        [updateIsCompleted, isCompleted, isLast, addNew, deleteItem, id]
    );

    const autoFocusRef = useCallback(inputEl => {
        if (inputEl !== null && isLast) {
            inputEl.focus();
        }
    }, [isLast]);

    return (
        <div className={classnames(styles.todoItem, { [styles.isCompleted]: isCompleted })}>
            <TodoItemToggleView value={isCompleted} onChange={updateIsCompleted} tabIndex={-1} />
            <TextField value={text} onChange={updateText} onKeyDown={handleKeyDown} ref={autoFocusRef} />
        </div>);
}
