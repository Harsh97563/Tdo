import React, {useEffect, useRef, useState} from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { addTodoAtom,rerenderAton} from '../State_Recoil/atom'
import axios from 'axios'

function AddTodo() {
  const inputRef= useRef(null);
    const [addTodo, setaddTodo] = useRecoilState(addTodoAtom);
    const [update, setupdate] = useRecoilState(rerenderAton);
    const [currentTodo, setCurrentTodo] = useState("");  
    useEffect(()=>{
      inputRef.current.focus()
    }, [])
  return (
    <div className={`fixed flex z-50 flex-col left-[-85vw] md:left-[-50vw] justify-between items-center duration-700 w-[80vw] md:w-[45vw] h-[50vh] md:h-[80vh] ${addTodo} bg-teal-900 rounded-3xl p-10`}>
        <div className=' absolute top-5 right-5'>
            <button onClick={()=>{
                setaddTodo("");
            }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          </button>
        </div>
        <div className='w-full flex font-mono text-2xl '>
            <input className=' m-5 text-white border-none focus: outline-none bg-transparent w-full' type="text" 
            ref={inputRef} 
            value={currentTodo} 
            placeholder='Type your todo!' 
            onChange={(e)=>{
              setCurrentTodo(e.target.value)
            }}
            onClick={()=>{

            }}/>
        </div>
        <div className=' flex w-full h-[40vh] mt-2 '>Priorities(will soon add this feature)</div>
        <div><button className='bg-teal-700 text-white text-xl rounded-xl w-[20vw] md:w-[15vw] p-2' onClick={()=>{
          setaddTodo("")
          axios.post("https://todoudo.onrender.com/api/v1/todo/addtodo", {
                title: currentTodo
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
              .then((res)=>{
                setCurrentTodo("");
                console.log(res);
              })
              .catch((error)=>{
                console.log(error);
            }).finally(()=>{
                setupdate(true);
            })
        }}>Add Todo!</button></div>
    </div>
  )
}

export default AddTodo