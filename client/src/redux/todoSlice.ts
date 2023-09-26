import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Todo } from "./interfaces/TodoStateType";
import { initialState } from "./initialState";

export const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
    "todos/fetchTodos",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<{ data: Todo[] }>("http://localhost:9000/api/todo");
            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.message);
            }
            throw error;
        }
    }
);

export const createTodo = createAsyncThunk<Todo, string, { rejectValue: string }>(
    "todos/createTodo",
    async (newTodo, { rejectWithValue }) => {
        try {
            const response = await axios.post<Todo>("http://localhost:9000/api/todo", {
                todo: newTodo,
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.message);
            }
            throw error;
        }
    }
);

export const changeTodo = createAsyncThunk<number, { id: number; todo: string }, { rejectValue: string }>(
    "todos/changeTodo",
    async ({ id, todo }, { rejectWithValue }) => {
        try {
            await axios.put(`http://localhost:9000/api/todo/${id}`, {
                todo: todo,
            });
            return id;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.message);
            }
            throw error;
        }
    }
);

export const deleteTodo = createAsyncThunk<number, number, { rejectValue: string }>(
    "todos/deleteTodo",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:9000/api/todo/${id}`);
            return id;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.message);
            }
            throw error;
        }
    }
);

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, state => {
                state.status = "loading";
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? "An error occurred while fetching todos.";
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.todos.push(action.payload);
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
    },
});

export default todoSlice;
