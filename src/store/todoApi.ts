import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import type { Todo } from "@/types/todo";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], { start: number; limit: number }>({
      query: ({ start, limit }) => `todos?_start=${start}&_limit=${limit}`,
    }),
  }),
});

export const { useGetTodosQuery } = todoApi;
