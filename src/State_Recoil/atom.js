import { atom } from "recoil";

export const addTodoAtom= atom({
    key: 'addtodo',
    default: ""
})
export const nameAtom= atom({
    key: 'name',
    default: ""
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
export const LoadingPageAtom= atom({
    key: "editTodo",
    default: true
})
export const editTodoIDAtom= atom({
    key: "todoId",
    default: ""
})
export const rerenderAton= atom({
    key: "rerender",
    default: false,
})