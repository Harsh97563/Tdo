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
          return <Todo key={e._id} id={e._id} priority={e.priority} title={e.title}/>
        })
        }
      </div>
    </div>
  )
}

function Todo({title,id, priority}){
  setTimeout(() => {
    setDivanimation("w-[88vw] md:w-[35vw]");
    setInputanimation("w-[58vw] md:w-[28vw]");
  }, 500);
  let prior;
  const [btnState, setBtnState] = useState("invisible");
  const [tempTodo, setTempTodo] = useState(title);
  const [update, setupdate] = useRecoilState(rerenderAton);
  const [divanimation, setDivanimation] = useState("w-[0vw] md:w-[0vw]")
  const [inputanimation, setInputanimation] = useState("w-[0vw] md:w-[0vw]")
  const [inputActive, setInputActive] = useState("h-[7vh]");
  const [selectedPriority, setSelectedPriority] = useState("");
  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
    console.log(e.target.value);
  };
  if(priority==="red"){
    prior="shadow-red-500"
  }
  if(priority==="orange"){
    prior="shadow-orange-500"
  }
  if(priority==="yellow"){
    prior="shadow-yellow-500"
  }
  if(priority==="green"){
    prior="shadow-green-500"
  }
  const handlekeypress= (e)=>{
    if(e.key === 'Enter'){
      addTodoFunction();
    }
  }
  const addTodoFunction= ()=>{
    axios.post("https://todoudo.onrender.com/api/v1/todo/update", {
          updatedTitle: tempTodo,
          updatedPriority: selectedPriority,
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
            setInputActive("h-[7vh]")
          })
  }
  return <div className={`flex ${divanimation} overflow-hidden m-2 p-2 backdrop-blur-sm justify-between items-center ${inputActive}  duration-300 flex-col border-none shadow-[5px_5px_0px_1px_rgba(5,56,107,1)] ${prior} ease-linear bg-white/30 text-white`}>
    <div className='flex w-full h-[7vh]'>
    <div >
      <h2><input type="text" className={`text-white ${inputanimation} outline-none caret-black font-mono text-xl border-transparent focus:border-l-4 transition-all duration-300 focus:border-teal-950 bg-transparent p-2 h-full `} onChange={(e)=>{
        setTempTodo(e.target.value);
      }} value={tempTodo}
      onKeyPress={addTodoFunction}
      onFocus={()=>{
        setInputActive("h-[18vh] justify-between")
        setBtnState("visible");
      }}
      /></h2>
    </div>
    <div className='flex'>
      <button className={`m-2 ${btnState}`} onClick={(e)=>{
        addTodoFunction()
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
          setDivanimation("w-[0vw] md:w-[0vw]");
          setInputanimation("w-[58vw] md:w-[28vw]");
          console.log(res)
        })
        .catch((error)=>{
          console.log(error);
        })
        .finally(()=>{
          setupdate(true);
        })
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
      </button>

    </div>
    </div>
      <div className="flex space-x-2 mt-4 justify-center items-top w-full h-[20vh]">
        <input
          type="radio"
          name="priority"
          id="redinput"
          value="red"
          onChange={handlePriorityChange}
          className="hidden peer"
        />
        <label
          htmlFor="redinput"
          className={`w-[5vw] h-[5vh] border-2 ${
            selectedPriority === "red" ? "peer-checked:scale-125" : ""
          }`}
        >
          <div className="w-full h-full bg-red-500"></div>
        </label>

        <input
          type="radio"
          name="priority"
          id="orangeinput"
          value="orange"
          onChange={handlePriorityChange}
          className="hidden peer"
        />
        <label
          htmlFor="orangeinput"
          className={`w-[5vw] h-[5vh] border-2 ${
            selectedPriority === "orange" ? "peer-checked:scale-125" : ""
          }`}
        >
          <div className="w-full h-full bg-orange-500"></div>
        </label>

        <input
          type="radio"
          name="priority"
          id="amberinput"
          value="yellow"
          onChange={handlePriorityChange}
          className="hidden peer"
        />
        <label
          htmlFor="amberinput"
          className={`w-[5vw] h-[5vh] border-2 ${
            selectedPriority === "yellow" ? "peer-checked:scale-125" : ""
          }`}
        >
          <div className="w-full h-full bg-yellow-500"></div>
        </label>

        <input
          type="radio"
          name="priority"
          id="greeninput"
          value="green"
          onChange={handlePriorityChange}
          className="hidden peer"
        />
        <label
          htmlFor="greeninput"
          className={`w-[5vw] h-[5vh] border-2 ${
            selectedPriority === "green" ? "peer-checked:scale-125" : ""
          }`}
        >
          <div className="w-full h-full bg-lime-500"></div>
        </label>
      </div>
  </div>
}

export default Dashboard