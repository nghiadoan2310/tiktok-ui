import { SET_TODO_INPUT, ADD_TODO, DELETE_TODO } from "./Constants"

const initState = {
    todo: '',
    todos: []
}

function reducer(state, action) {
    switch (action.type) {
        case SET_TODO_INPUT:
            return {
                ...state,
                todo: action.payload
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case DELETE_TODO:
            const newTodos = state.todos;
            newTodos.splice(action.index, 1);
            return {
                ...state,
                todos: newTodos
            }
        default:
            throw new Error('Invalid action')
    }
}

export { initState }
export default reducer