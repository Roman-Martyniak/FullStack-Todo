import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteTodo, changeTodo } from "../../redux/todoSlice";
import { toastListError } from "../notify/notify";
import { useState } from "react";

const List = () => {
    const [newTodo, setNewTodo] = useState("");
    const [editTodoId, setEditTodoId] = useState<number | null>(null);
    // const [originalTodo, setOriginalTodo] = useState("");
    const todos = useAppSelector(state => state.todos.todos);
    const dispatch = useAppDispatch();

    const handleChangeTodo = (id: number) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            // setOriginalTodo(todoToEdit.todos);
            setEditTodoId(id);
        }
    };

    const handleSaveTodo = (id: number) => {
        dispatch(changeTodo({ id, todo: newTodo }))
            .unwrap()
            .then(() => {
                setEditTodoId(null);
                setNewTodo("");
                toast("Todo was successfully changed:)");
            })
            .catch(error => {
                console.log("Error changing todo:", error);
                toastListError();
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

    if (!Array.isArray(todos)) {
        return null;
    }

    return (
        <div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {editTodoId === todo.id ? (
                            <div>
                                <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
                                <button onClick={() => handleSaveTodo(todo.id)}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <div>
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
