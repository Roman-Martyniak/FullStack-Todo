export interface Todo {
    id: number;
    todo: string;
}

export interface TodosState {
    todos: Todo[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    text: string;
}
