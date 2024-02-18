import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AddTodo from './AddTodo'
import { useRecoilState, useRecoilValue } from 'recoil'
import { addTodoAtom, allTodosAtom, editTodoAtom, editTodoIDAtom, jwtTokenAtom, nameAtom, timeAtom, writingtodoAtom } from '../State_Recoil/atom'
import axios from 'axios'

function Dashboard() {
  const navigate= useNavigate()
  const [Name, setName] = useRecoilState(nameAtom)
  const [time, settime] = useState(new Date())
  const [loading, setloading] = useState(true)
  const [todos, setTodos] = useRecoilState(allTodosAtom);
  useEffect(() => {
    setInterval(() => {
      settime(new Date())
    }, 1000);
  }, [])
  useEffect(()=>{
    axios.get('https://todoudo.onrender.com/api/v1/todo/gettodos',
     {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res)=>{
      setTodos(res.data.todos.todos);
      setName(res.data.firstName);
      setloading(false)
      console.log(loading);
    })
    .catch((error)=>{
      navigate('/SignUp')
      console.log(error);
    })
  }, [todos])
  
  return (
    <div className='w-[100vw] flex md:items-start flex-col md:flex-row h-[100vh] justify-between bg-slate-700 pt-[10vh] '>
      <AddTodo/>
      <div className='flex overflow-auto flex-col w-[92vw] md:w-[40vw]  item-center m-4 md:m-8 rounded-3xl p-3 md:p-6 bg-zinc-400 h-[80vh] '>
        {loading? <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
          <span class="sr-only">Loading...</span>
        </div>:
        todos.map((e)=>{
          return <Todo key={e._id} id={e._id} title={e.title}/>
        })
        }
      </div>
      <div className='m-4 md:m-8 bg-zinc-400 w-[92vw] md:w-[20vw] flex flex-col items-center justify-center text-white  h-[20vh] rounded-3xl'>
        <div className=' text-blue-700 font-bold font-mono text-2xl'>Welcome, {Name}</div>
        <div className='text-7xl duration-100' >
          {time.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit',second: '2-digit', hour12: false })}
        </div>
        <div className=' text-blue-700 font-mono font-bold text-2xl'>
          {time.toLocaleDateString('en-IN', { weekday: 'long' })}
        </div>
      </div>
    </div>
  )
}

function Todo({title,id}){
  const [addTodo, setAddTodo] = useRecoilState(addTodoAtom)
  const [edittodo, setEdittodo] = useRecoilState(editTodoAtom)
  const [writingtodo, setWritingtodo] = useRecoilState(writingtodoAtom)
  const [todoId, setTodoId] = useRecoilState(editTodoIDAtom)
  return <div className='flex w-[80vw] md:w-[35vw] m-2 p-3 rounded-xl h-[7vh] justify-between items-center flex-row border-none bg-gray-700 text-white'>
    
    <div>
      <h2><input type="text" className='text-white font-mono text-xl  bg-transparent p-2 ' onChange={(e)=>{
      }} value={title}/></h2>
    </div>
    <div className='flex'>
      <button className='m-2' onClick={(e)=>{
        axios.post("https://todoudo.onrender.com/api/v1/todo/delete", {
          todoId: id 
        },{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then((res)=>{
          console.log(res)
        })
        .catch((error)=>{
          console.log(error);
        })
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
      </button>
      <button onClick={()=>{
        setWritingtodo(title)
        setTodoId(id)
        setAddTodo("translate-x-[70vw]")
        setEdittodo(true)
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
      </svg>
      </button>

    </div>
  </div>
}

export default Dashboard