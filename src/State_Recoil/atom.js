import { atom } from "recoil";

export const addTodoAtom= atom({
    key: 'addtodo',
    default: ""
})
export const nameAtom= atom({
    key: 'name',
    default: ""
})
export const writingtodoAtom= atom({
    key: 'writingtodo',
    default:"Type Your Todo!"
})
export const allTodosAtom= atom({
    key: 'todos',
    default:[]
})
export const timeAtom= atom({
    key: 'time',
    default: ""
})
export const jwtTokenAtom= atom({
    key: 'jwtToken',
    default: ""
})
export const editTodoAtom= atom({
    key: "editTodo",
    default: false
})
export const editTodoIDAtom= atom({
    key: "todoId",
    default: ""
})