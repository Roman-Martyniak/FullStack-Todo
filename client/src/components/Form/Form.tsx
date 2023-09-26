import React, { useState, useEffect } from "react";
import { createTodo, fetchTodos } from "../../redux/todoSlice";
import { useAppDispatch } from "../../redux/hooks";
import { notifySucces, notifyError } from "../notify/notify";
import { FormProps } from "../../../source/FormProps";

const Form: React.FC<FormProps> = ({ title }) => {
    const [newTodo, setNewTodo] = useState<string>("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newTodo.trim()) {
            notifyError();
        } else {
            dispatch(createTodo(newTodo))
                .then(() => {
                    setNewTodo("");
                    notifySucces();
                })
                .catch((error: Error) => {
                    console.log("Error creating todo:", error);
                    notifyError();
                });
        }
    };

    return (
        <div>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default Form;
