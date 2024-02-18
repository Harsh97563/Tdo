import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { addTodoAtom, allTodosAtom, editTodoAtom, editTodoIDAtom, jwtTokenAtom, timeAtom, writingtodoAtom } from '../State_Recoil/atom'
import axios from 'axios'

function AddTodo() {
    const [addTodo, setaddTodo] = useRecoilState(addTodoAtom)
    const [writingtodo, setWritingtodo] = useRecoilState(writingtodoAtom)
    const [edittodo, seteditTodo]= useRecoilState(editTodoAtom)
    const todoId= useRecoilValue(editTodoIDAtom)
  return (
    <div className={`fixed flex flex-col left-[-80vw] md:left-[-50vw] justify-between items-center duration-700 w-[80vw] md:w-[50vw] h-[80vh] ${addTodo} bg-slate-300 rounded-3xl p-10`}>
        <div className=' absolute top-5 right-5'>
            <button onClick={()=>{
                setaddTodo("")
                seteditTodo(false)
                setWritingtodo("Type Your Todo!")
            }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          </button>
        </div>
        <div className=' max-w-fit break-all font-mono text-2xl '>
            {writingtodo}
        </div>
        <div className='border flex md:w-[5vw] h-[40vh] mt-2 '>Priorities</div>
        <div><button className='bg-gray-700 text-white text-xl rounded-xl w-[20vw] md:w-[15vw] p-2' onClick={()=>{
          setaddTodo("")
          if(edittodo){
            axios.post("https://todoudo.onrender.com/api/v1/todo/update", {
            updatedTitle: writingtodo,
            todoId: todoId

            },
            {
              headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            })
            .then((res)=>{
              console.log(res);
            }).catch((error)=>{
              console.log(error);
            })
            return
          }
          axios.post("https://todoudo.onrender.com/api/v1/todo/addtodo", {
            title: writingtodo
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((res)=>{
            console.log(res);
          }).catch((error)=>{
            console.log(error);
          })
        }}>{addTodo ? "Update": "Add!"}</button></div>
    </div>
  )
}

export default AddTodo