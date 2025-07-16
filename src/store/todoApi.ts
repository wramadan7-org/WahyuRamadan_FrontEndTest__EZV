import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import type { TodoType } from "@/types/todo";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    createTodo: builder.mutation<TodoType, Partial<TodoType>>({
      query: (body) => ({
        url: "/todos",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Todo" as never, id: "LIST" }],
    }),
    getTodos: builder.query<TodoType[], { start: number; limit: number }>({
      query: ({ start, limit }) => `/todos?_start=${start}&_limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todo" as const, id })),
              { type: "Todo", id: "LIST" },
            ]
          : [{ type: "Todo", id: "LIST" }],
    }),
    getTodo: builder.query<TodoType, number>({
      query: (id) => `/todos/${id}`,
      providesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
    updateTodo: builder.mutation<
      void,
      Pick<TodoType, "id"> & Partial<TodoType>
    >({
      query: ({ id, ...patch }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const pathResult = dispatch(
          todoApi.util.updateQueryData("getTodo", id, (draft) => {
            Object.assign(draft, patch);
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error(`onQuryStarted: ${error}`);
          pathResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Todo", id }],
    }),
    deleteTodo: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/todos/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useGetTodosQuery,
  useGetTodoQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
