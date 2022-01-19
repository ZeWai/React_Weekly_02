import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUserThunk = (username, password) => {
    return (dispatch) => {
        axios
            .post(`http://localhost:8080/api/login`, {
                username,
                password,
            })
            .then((res) => {
                if (res.data === null) {
                } else {
                    localStorage.setItem("LoggedInToken", res.data);
                    dispatch({ type: LOGIN_USER });
                }
            });
    };
};

export const signupUserThunk = (username, password) => {
    return (dispatch) => {
        axios
            .post(`http://localhost:8080/api/signup`, {
                username,
                password,
            })
            .then((res) => {
                localStorage.setItem("LoggedInToken", res.data);
                dispatch({ type: LOGIN_USER });
            });
    };
};

export const logoutNowThunk = () => (dispatch) => {
    localStorage.removeItem("LoggedInToken");
    dispatch({
        type: LOGOUT_USER,
    });
};
