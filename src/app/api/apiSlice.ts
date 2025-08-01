import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Todos"],
  endpoints: (build) => ({
    getTodosApi: build.query<Todo[], void>({
      query: () => "/todos",
    }),

    createTodoApi: build.mutation<Todo, Partial<Todo>>({
      query: (body) => ({
        url: "todos",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetTodosApiQuery, useCreateTodoApiMutation } = apiSlice;
