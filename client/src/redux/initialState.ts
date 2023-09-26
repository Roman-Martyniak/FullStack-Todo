import { TodosState } from "./interfaces/TodoStateType";

export const initialState: TodosState = {
    todos: [],
    status: "idle",
    error: null,
    text: "",
};
