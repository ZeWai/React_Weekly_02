import style from './Todolist.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { logoutNowThunk } from '../store/auth/action';
import { useSelector, useDispatch } from 'react-redux';
import { EditTodoThunk, DeleteTodoThunk, GetTodosThunk, AddTodoThunk, CLEAR_TODOS } from '../store/todo/action';

export default function Todolist() {
    const dispatch = useDispatch()
    const [plan, setPlan] = useState('');
    const [editedplan, setEditedTitle] = useState("");
    const todosFromRedux = useSelector((state) => state.todoStore.lists);
    const [currentstatus, setCurrentstatus] = useState(Boolean)
    const submitTodo = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newTodo = { plan };
            plan.length > 0 && dispatch(AddTodoThunk(newTodo));
            setPlan("");
        }
    };

    const editTodoTitle = (e, id) => {
        e.preventDefault();
        editedplan.length > 0 &&
            dispatch(EditTodoThunk({ plan: editedplan, id: id }));
        setPlan("");
    };

    const editStatus = (id, status) => {
        status = !currentstatus
        console.log("status", status)
        setCurrentstatus(status)
        dispatch(EditTodoThunk({ id: id, status: status }));
    };

    const deleteTodo = (e, i) => {
        dispatch(DeleteTodoThunk(i));
    };

    useEffect(() => {
        dispatch(GetTodosThunk());
    }, [dispatch]);


    return (
        <div className={style.todolist}>
            <h1 className={style.title}>ToDo List</h1>
            <br />
            <Link to='/login'>
                <button onClick={() => {
                    dispatch({ type: CLEAR_TODOS });
                    dispatch(logoutNowThunk());
                }} className={style.btn}>I'm Done. Bye</button>
            </Link>
            <br />
            <br />
            <input type="text" value={plan} onChange={(e) => setPlan(e.currentTarget.value)} size='30'
                placeholder="What is your plan today?" onKeyPress={submitTodo} className={style.plan}></input>
            <br />
            <br />
            <div className={style.line} />
            <div>
                {todosFromRedux && todosFromRedux.length >= 1
                    ? todosFromRedux.map((todo) => (
                        <div key={todo.id}>
                            <br />
                            <input
                                id={todo.id}
                                type="text"
                                defaultValue={todo.todolists}
                                onChange={(e) => {
                                    setEditedTitle(e.currentTarget.value);
                                }}
                                onBlur={(e) => {
                                    editTodoTitle(e, todo.id);
                                }}
                                className={style.plan}
                            />
                            <button onClick={() => { editStatus(todo.id, todo.status) }} className={todo.status ? `${style.done}` : `${style.ongoing}`}>{todo.status ? 'Done' : 'On Going'}</button>
                            <button className={style.btn}
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
