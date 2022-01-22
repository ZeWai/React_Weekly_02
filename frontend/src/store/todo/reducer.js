import {
    ADD_TODO,
    EDIT_TODO,
    DELETE_TODO,
    GET_TODOS,
    CLEAR_TODOS,
    GET_INFO,
} from "./action";

const initialState = {
    lists: [],
    name: "",
};

export function todoReducer(state = initialState, action) {
    switch (action.type) {
        case GET_INFO:
            return {
                todos: state.todos,
                name: action.payload,
            };
        case ADD_TODO:
            return {
                lists: [action.payload].concat(state.lists),
                name: state.name,
            };
        case EDIT_TODO:
            let newTodo = action.payload[0];
            let index = state.lists.findIndex((i) => i.id === newTodo.id);
            state.lists.splice(index, 1, newTodo);
            return {
                lists: state.lists,
                name: state.name,
            };
        case DELETE_TODO:
            return {
                name: state.name,
                lists: state.lists.filter((todo) => {
                    console.log(action.payload);
                    return todo.id !== action.payload;
                }),
            };
        case GET_TODOS:
            return {
                name: state.name,
                lists: state.lists.concat(action.payload).sort((a, b) => b.id - a.id),
            };
        case CLEAR_TODOS:
            return {
                name: state.name,
                lists: [],
            };
        default:
            return state;
    }
}
