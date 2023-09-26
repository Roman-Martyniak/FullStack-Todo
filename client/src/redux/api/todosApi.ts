import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../interfaces/TodoStateType";

const api = createApi({
    reducerPath: "todoSlice",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/api/todo" }),
    endpoints: builder => ({
        getTodos: builder.query<{ data: Todo[]; success: boolean }, void>({
            query: () => ({
                url: "",
            }),
        }),
        createTodo: builder.mutation<Todo, { todo: string }>({
            query: newTodo => ({
                url: "",
                method: "POST",
                body: { todo: newTodo.todo },
            }),
        }),
        deleteTodo: builder.mutation<void, number>({
            query: id => ({
                url: `/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useGetTodosQuery, useCreateTodoMutation, useDeleteTodoMutation } = api;
export default api;
