import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LoadingPageAtom, addTodoAtom, allTodosAtom, nameAtom, rerenderAton } from '../State_Recoil/atom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AddTodoBtn() {
    const navigate= useNavigate()
    const [AddTodo, setAddTodo] = useRecoilState(addTodoAtom);
    const [update, setupdate] = useRecoilState(rerenderAton);
    const [todos, setTodos] = useRecoilState(allTodosAtom);
    const [loading, setloading] = useRecoilState(LoadingPageAtom);
    const [Name, setName] = useRecoilState(nameAtom)
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
        console.log(res);
          setupdate(false)
        })
        .catch((error)=>{
          navigate('/SignUp')
          console.log(error);
        })
      }, [update])
  return (
    <div className='flex w-[25vw] md:w-[15vw] h-[5vh] m-2'>
        <button className='text-lime-500 p-2 w-full rounded-md bg-teal-200' onClick={()=>{
            setAddTodo("translate-x-[90vw] md:translate-x-[70vw]")
        }}>Add Todo</button>
    </div>
  )
}

export default AddTodoBtn