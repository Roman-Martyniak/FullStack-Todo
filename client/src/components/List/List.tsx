import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteTodo, changeTodo, changeTodoCompleted } from "../../redux/todoSlice";
import { toastListError } from "../notify/notify";
import { useState } from "react";

const List = () => {
    const [newTodo, setNewTodo] = useState("");
    const [editTodoId, setEditTodoId] = useState<number | null>(null);
    const todos = useAppSelector(state => state.todos.todos);
    const dispatch = useAppDispatch();

    const handleChangeTodo = (id: number) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            setNewTodo(todoToEdit.todo);
            setEditTodoId(id);
        }
    };

    const handleSaveTodo = (id: number) => {
        dispatch(changeTodo({ id, todo: newTodo }))
            .unwrap()
            .then(() => {
                setEditTodoId(null);
                setNewTodo("");
            })
            .catch(error => {
                console.log("Error changing todo:", error);
            });
    };

    const handleCancelEdit = () => {
        setEditTodoId(null);
        setNewTodo("");
    };

    const handleDelete = (id: number) => {
        dispatch(deleteTodo(id))
            .unwrap()
            .then(() => {
                toast("Todo was successfully deleted:)");
            })
            .catch(error => {
                console.log("Error deleting todo:", error);
                toastListError();
            });
    };

    const handleCheckboxChange = (id: number) => {
        const todoToChange = todos.find(todo => todo.id === id);
        if (!todoToChange) {
            return;
        }

        const newCompletedValue = !todoToChange.completed;

        dispatch(changeTodoCompleted({ id, completed: newCompletedValue }))
            .then(() => {})
            .catch(error => {
                console.log("Error changing todo:", error);
            });
    };

    return (
        <div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {editTodoId === todo.id ? (
                            <div>
                                <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
                                <button onClick={() => handleSaveTodo(todo.id)}>Save</button>
                                <button onClick={() => setEditTodoId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleCheckboxChange(todo.id)}
                                />
                                {todo.todo}
                                <button onClick={() => handleChangeTodo(todo.id)}>Change</button>
                                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
