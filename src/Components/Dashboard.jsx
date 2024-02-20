import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AddTodo from './AddTodo'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LoadingPageAtom, allTodosAtom, nameAtom, rerenderAton} from '../State_Recoil/atom'
import axios from 'axios'
import Clock from './Clock';
import Loading from './Loadind';

function Dashboard() {
  const navigate= useNavigate()
  const [Name, setName] = useRecoilState(nameAtom);
  const [loading, setloading] = useRecoilState(LoadingPageAtom);
  const [todos, setTodos] = useRecoilState(allTodosAtom);
  
  return (
    <div className='w-[100vw] flex md:items-start flex-col md:flex-row h-[100vh] justify-between bg-emerald-400 pt-[10vh] '>
      <AddTodo/>
      <Clock Name={Name}/>
      <div className='flex overflow-auto flex-col w-[92vw] md:w-[40vw]  item-center m-4 md:m-8 rounded-3xl  md:p-6 h-[80vh] '>
        {loading? <Loading/>:
        todos.map((e)=>{
          return <Todo key={e._id} id={e._id} title={e.title}/>
        })
        }
      </div>
    </div>
  )
}

function Todo({title,id}){
  console.log("rerender");
  const [btnState, setBtnState] = useState("invisible");
  const [tempTodo, setTempTodo] = useState(title);
  const [update, setupdate] = useRecoilState(rerenderAton);
  return <div className='flex w-[88vw] md:w-[35vw] m-2 p-3 backdrop-blur-sm  h-[7vh] justify-between items-center flex-row border-none shadow-[5px_5px_0px_1px_rgba(5,56,107,1)] transition-all bg-white/30 text-white'>
    
    <div >
      <h2><input type="text" className={`text-white w-[58vw] md:w-[28vw] outline-none caret-black font-mono text-xl border-transparent focus:border-l-4 transition-all duration-300 focus:border-teal-950 bg-transparent p-2 `} onChange={(e)=>{
        setTempTodo(e.target.value);
        setBtnState("visible");
      }} value={tempTodo}/></h2>
    </div>
    <div className='flex'>
    <button className={`m-2 ${btnState}`} onClick={(e)=>{
        axios.post("https://todoudo.onrender.com/api/v1/todo/update", {
          updatedTitle: tempTodo,
          todoId: id

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
          }).finally(()=>{
            setBtnState("invisible");
          })
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      </button>
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
        .finally(()=>{
          setupdate(true);
        })
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
      </button>

    </div>
  </div>
}

export default Dashboard