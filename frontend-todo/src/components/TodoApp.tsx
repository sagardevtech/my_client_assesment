import React from 'react';
import AddTodo from './AddTodo';
import Filter from './Filter';
import TodoList from './TodoList';

const TodoApp: React.FC = () => {
  return (
    <div>
      <h1>Todo App</h1>
      <AddTodo />
      <Filter />
      <TodoList />
    </div>
  );
};

export default TodoApp;
