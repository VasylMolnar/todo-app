import { createSlice } from "@reduxjs/toolkit";
import type { Todo } from "../app/api/apiSlice";

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload;
    },

    addTodo(state, action) {
      state.todos.unshift(action.payload);
    },

    updateTodo(state, action) {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );

      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          ...action.payload,
        };
      }
    },

    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { setTodos, addTodo, updateTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
