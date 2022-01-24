import axios from "axios";

export const ADD_TODO = "ADD_TODO";
export const EDIT_TODO = "EDIT TODO";
export const DELETE_TODO = "DELETE TODO";
export const GET_TODOS = "GET_TODOS";
export const CLEAR_TODOS = "CLEAR_TODOS";
export const EDIT_DONE = "EDIT_DONE"
export const GET_INFO = "GET_INFO";

export function GetInfo(info) {
    return {
        type: GET_INFO,
        payload: info,
    };
}

export function AddTodo(todo) {
    return {
        type: ADD_TODO,
        payload: todo,
    };
}

export function EditTodo(todo) {
    return {
        type: EDIT_TODO,
        payload: todo,
    };
}

export function EditDone(todo) {
    return {
        type: EDIT_DONE,
        payload: todo,
    };
}

export function DeleteTodo(id) {
    return (dispatch) => {
        dispatch({
            type: DELETE_TODO,
            payload: id,
        });
    };
}

export function GetTodos(lists) {
    return {
        type: GET_TODOS,
        payload: lists,
    };
}

export function CleanTodos(lists) {
    return {
        type: CLEAR_TODOS,
        payload: lists,
    };
}

export function GetInfoThunk() {
    return (dispatch) => {
        let token = localStorage.getItem("LoggedInToken");

        axios
            .get(`http://localhost:8080/api/info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response, 'thunk action');
                dispatch(GetInfo(response.data[0].username));
            });
    };
}
export function GetTodosThunk() {
    return (dispatch) => {
        let token = localStorage.getItem("LoggedInToken");
        axios
            .get(`${process.env.REACT_APP_API_SERVER}/api/todolists`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                dispatch(GetTodos(response.data));
            });
    };
}

export function AddTodoThunk(todo) {
    console.log(" add todo thunk:", todo);
    return (dispatch) => {
        let token = localStorage.getItem("LoggedInToken");
        axios
            .post(
                `http://localhost:8080/api/todolists`,
                { todolists: todo.plan },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                dispatch(AddTodo(response.data));
            });
    };
}

export function EditTodoThunk(todo) {
    console.log(todo, 'current status')
    return (dispatch) => {
        let token = localStorage.getItem("LoggedInToken");
        axios
            .put(
                `http://localhost:8080/api/todolists`,
                { todolists: todo.plan, id: todo.id, status: todo.status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                dispatch(EditTodo(response.data));
            });
    };
}

// Edit and Delete functionalities

export function DeleteTodoThunk(id) {
    return (dispatch) => {
        let token = localStorage.getItem("LoggedInToken");
        axios
            .delete(`http://localhost:8080/api/todolists/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                dispatch(DeleteTodo(response.data));
            });
    };
}
