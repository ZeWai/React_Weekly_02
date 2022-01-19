import style from './Todolist.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { logoutNowThunk } from '../store/auth/action';
import { useSelector, useDispatch } from 'react-redux';

import { EditTodoThunk, DeleteTodoThunk, GetTodosThunk, AddTodoThunk } from '../store/todo/action';

export default function Todolist() {
    const dispatch = useDispatch()
    const [plan, setPlan] = useState('');
    const [editedplan, setEditedTitle] = useState("");
    const todosFromRedux = useSelector((state) => state.todoStore.lists);
    const submitTodo = (e) => {
        e.preventDefault();
        const newTodo = { plan };
        plan.length > 0 && dispatch(AddTodoThunk(newTodo));
        setPlan("");
    };

    const editTodoTitle = (e, id) => {
        e.preventDefault();
        editedplan.length > 0 &&
            dispatch(EditTodoThunk({ plan: editedplan, id: id }));
        setPlan("");
    };


    const deleteTodo = (e, i) => {
        dispatch(DeleteTodoThunk(i));
    };

    const EnterPress = (e) => {
        if (e.key === 'Enter') {
            submitTodo(e);
        }
    }

    useEffect(() => {
        dispatch(GetTodosThunk());
    }, [dispatch]);

    return (
        <div className={style.todolist}>
            <h1>ToDo List</h1>
            <br />
            <Link to='/login'>
                <button onClick={() => {
                    dispatch(logoutNowThunk())
                }}>Logout</button>
            </Link>
            <br />
            <br />
            <input type="text" value={plan} onChange={(e) => setPlan(e.currentTarget.value)} size='30'
                placeholder="What is your plan today?" onKeyPress={EnterPress}></input>
            <br />
            <div>
                {todosFromRedux && todosFromRedux.length >= 1
                    ? todosFromRedux.map((todo) => (
                        <div key={todo.id}>
                            <br />
                            <input
                                className="todo-item"
                                id={todo.id}
                                type="text"
                                defaultValue={todo.todolists}
                                onChange={(e) => {
                                    setEditedTitle(e.currentTarget.value);
                                }}
                                onBlur={(e) => {
                                    editTodoTitle(e, todo.id);
                                }}
                            />
                            <label>
                                <input
                                    type='checkbox' defaultValue={todo.tasksDone}
                                    className={style.checkbox}
                                /><span className={style.checkboxlabelbefore}></span>
                                <span className={style.checkboxlabel}>Done</span></label>
                            <button
                                onClick={(e) => deleteTodo(e, todo.id)}
                            >Delete</button>
                            <br />
                        </div>
                    ))
                    : null}
            </div>

        </div >
    )
}
