import React, {  } from 'react';
import styles from './TodoListView.module.css';
import { useSelector } from 'react-redux';
import { getTodoItems, todoActions } from '../store/todos';
import { useAction } from '../common/react-redux';
import { TodoItemView } from './TodoItemView';

export const TodoListView = () => {
    const items = useSelector(getTodoItems);
    const addNew = useAction(todoActions.add);

    return (
        <div className={styles.todoListContainer}>
            <button onClick={addNew} className={styles.addNew} tabIndex={-1}>+</button>
            <div className={styles.todoItems}>
                {items.map(id => <TodoItemView key={id} id={id} />)}
            </div>
        </div>
    );
}
