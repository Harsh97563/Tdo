import React from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import AddTodoBtn from './AddTodoBtn'
import { addTodoAtom } from '../State_Recoil/atom'

function Header() {
  const [AddTodo, setAddTodo] = useRecoilState(addTodoAtom)
  return (
    <div className='flex fixed w-[100vw]'>

        <nav className='flex bg-teal-900 text-white rounded-xl p-2 items-center justify-between  m-4 w-[98vw]'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
            </svg>
          </div>
          <div className='flex'>
            <AddTodoBtn/>
            <button className=' rounded-md bg-teal-200 w-full 
            h-[5vh] text-lime-500 m-2'>Pomodoro!</button>
          </div>
          {/* <ul className='flex list-none w-[10vw] justify-between'>
              <li>Home</li>
              <li>About</li>
              <li>Stats </li>
          </ul> */}
        </nav>
    </div>
  )
}

export default Header