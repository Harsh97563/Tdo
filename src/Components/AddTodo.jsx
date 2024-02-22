import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { addTodoAtom, rerenderAton } from "../State_Recoil/atom";
import axios from "axios";

function AddTodo() {
  const inputRef = useRef(null);
  const [addTodo, setaddTodo] = useRecoilState(addTodoAtom);
  const [update, setupdate] = useRecoilState(rerenderAton);
  const [currentTodo, setCurrentTodo] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handlekeypress = (e) => {
    if (e.key === "Enter") {
      addTodoFunction();
    }
  };
  const addTodoFunction = () => {
    setaddTodo("");
    console.log(selectedPriority);
    axios
      .post(
        "https://todoudo.onrender.com/api/v1/todo/addtodo",
        {
          title: currentTodo,
          priority: selectedPriority
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setCurrentTodo("");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setupdate(true);
      });
  };
  return (
    <div
      className={`fixed border flex z-50 flex-col left-[-85vw] md:left-[-50vw] justify-between items-center duration-700 w-[80vw] md:w-[45vw] h-[50vh] md:h-[80vh] ${addTodo} bg-teal-900 rounded-3xl p-10`}
    >
      <div className=" absolute top-5 right-5">
        <button
          onClick={() => {
            setaddTodo("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="w-full flex font-mono text-2xl ">
        <input
          className=" m-5 text-white border-none focus: outline-none bg-transparent w-full"
          type="text"
          ref={inputRef}
          value={currentTodo}
          placeholder="Click here to type your todo!"
          onChange={(e) => {
            setCurrentTodo(e.target.value);
          }}
          onKeyPress={handlekeypress}
        />
      </div>
      <div className="flex space-x-2 justify-center items-top w-full h-[20vh]">
        <input
          type="radio"
          name="priority"
          id="red"
          value="red"
          onChange={handlePriorityChange}
          className="hidden peer"
        />
        <label
          htmlFor="red"
          className={`w-[5vw] h-[5vh] border-2 ${
            selectedPriority === "red" ? "peer-checked:scale-125" : ""
          }`}
        >
          <div className="w-full h-full bg-red-500"></div>
        </label>

        <input
          type="radio"
          name="priority"
          id="orange"
          value="orange"
          onChange={handlePriorityChange}
          className="hidden peer"
        />
        <label
          htmlFor="orange"
          className={`w-[5vw] h-[5vh] border-2 ${
            selectedPriority === "orange" ? "peer-checked:scale-125" : ""
          }`}
        >
          <div className="w-full h-full bg-orange-500"></div>
        </label>

        <input
          type="radio"
          name="priority"
          id="amber"
          value="yellow"
          onChange={handlePriorityChange}
          className="hidden peer"
        />
        <label
          htmlFor="amber"
          className={`w-[5vw] h-[5vh] border-2 ${
            selectedPriority === "yellow" ? "peer-checked:scale-125" : ""
          }`}
        >
          <div className="w-full h-full bg-yellow-500"></div>
        </label>

        <input
          type="radio"
          name="priority"
          id="green"
          value="green"
          onChange={handlePriorityChange}
          className="hidden peer"
        />
        <label
          htmlFor="green"
          className={`w-[5vw] h-[5vh] border-2 ${
            selectedPriority === "green" ? "peer-checked:scale-125" : ""
          }`}
        >
          <div className="w-full h-full bg-lime-500"></div>
        </label>
      </div>
      <div>
        <button
          className="bg-teal-700 text-white text-xl rounded-xl w-[20vw] md:w-[15vw] p-2"
          onClick={() => {
            addTodoFunction();
          }}
        >
          Add Todo!
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
