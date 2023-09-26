import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import api from "./api/todosApi";

export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer,
        // [todoSlice.name]: todoSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
