import style from './Login.module.css'
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { Modal } from "react-bootstrap";
import Signup from './Signup/Signup'
import { loginUserThunk } from '../store/auth/action'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const auth = useSelector((state) => state.authStore.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const modalClose = () => setModal(false);

    useEffect(() => {
        if (auth === true) {
            navigate("/todolists");
        }
    }, [auth, navigate]);

    const login = (e) => {
        e.preventDefault();
        username.length > 0 &&
            password.length > 0 &&
            dispatch(loginUserThunk(username, password)
            )
    };

    const enteringusername = (e) => {
        const typing = e.currentTarget.value;
        setUsername(typing);
    };

    const enteringpassword = (e) => {
        const typing = e.currentTarget.value;
        setPassword(typing);
    };
    return (
        <div className={style.loginpage}>
            <div className={style.background} />

            <div className={style.backgroundafter} />
            <div className={style.content}>
                <p className={style.heading}> React Weekly - ToDo List</p>
                <br />
                <div><p>Username: &nbsp; </p><input type='text' name='username' value={username} onChange={enteringusername}></input></div>
                <br />
                <div><p>Password: &nbsp; </p><input type='password' name='password' value={password} onChange={enteringpassword}></input></div>
                <br />
                <button className={style.btn} onClick={login} >Login</button>
                <button className={style.btn} style={{ marginLeft: '20px' }} onClick={() => {
                    setModal(!modal);
                }}>Signup</button>
                <Modal show={modal} onHide={modalClose} centered size="lg" >
                    <Signup />
                </Modal>
            </div>
        </div>
    )
}

