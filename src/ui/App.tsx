import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { buildStore } from '../store/buildStore';
import { todoActions } from '../store/todos';
import { TodoListView } from './TodoListView';

const store = buildStore();

const AppView = () => {
  useEffect(() => {
    store.dispatch(todoActions.add())
  }, []);

  return (
    <Provider store={store}>
      <TodoListView />
    </Provider>
  );
}


export default AppView;
