import style from './Todolist.module.css'
import { Link } from 'react-router-dom'
import { useState } from "react";


export default function Todolist() {
    const [plan, setPlan] = useState('What is your plan?');

    return (
        <div className={style.todolist}>
            <h1>ToDo List</h1>
            <Link to='/login'>
                <button>Logout</button>
            </Link>
            <br />
            <br />
            <input type="text" value={plan} onChange={(e) => setPlan(e.currentTarget.value)}></input>

        </div >
    )
}
