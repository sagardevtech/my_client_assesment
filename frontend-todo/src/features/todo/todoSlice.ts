import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './types';
import { v4 as uuidv4 } from 'uuid';

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'completed' | 'pending';
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({ id: uuidv4(), text: action.payload, completed: false });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<'all' | 'completed' | 'pending'>) => {
      state.filter = action.payload;
    },
    editTodo: (state, action: PayloadAction<{ id: string; newText: string }>) => {
        const todo = state.todos.find((t) => t.id === action.payload.id);
        if (todo) {
          todo.text = action.payload.newText;
        }
    },
    clearAllTodos: (state) => {
        state.todos = [];
      }
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter, editTodo, clearAllTodos } = todoSlice.actions;
export default todoSlice.reducer;
