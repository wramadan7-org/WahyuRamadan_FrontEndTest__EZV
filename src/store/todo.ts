import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import type { Todo } from "@/types/todo";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], string>({
      query: () => "todos",
    }),
  }),
});
