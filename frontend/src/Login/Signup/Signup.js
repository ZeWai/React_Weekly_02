import style from './Signup.module.css'
import { useNavigate } from 'react-router-dom'
import { Modal, Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";


export default function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let dispatch = useDispatch();

    let navigate = useNavigate();

    let authenticated = useSelector((state) => state.authStore.auth);

    useEffect(() => {
        if (authenticated) {
            navigate("/todo");
        }
    }, [authenticated, navigate]);

    return (
        <div className={style.modal}>
            <Modal.Header className={style.modalhearder} >
                Signup
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col />
                    <Col>
                        <label>Username:</label>
                        <br />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.currentTarget.value)}
                        />
                    </Col>
                    <Col>
                        <label>Password:</label>
                        <br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        // onKeyPress={EnterPress}
                        />
                        <br />
                        {/* <span className={style.errorMessage}>{errorMessage}</span> */}
                    </Col>
                    <Col />
                </Row>
            </Modal.Body>
            <Modal.Footer className={style.modalfooter}>
                {/* <span>{error}</span> */}
                <button className={style.modalbutton} onChange={(e) => {
                    e.preventDefault();
                    username.length > 0 &&
                        password.length > 0 &&
                        dispatch(props.thunk(
                            username,
                            password
                        ))
                }}>Sign up</button>
            </Modal.Footer>
        </div>
    )
}
