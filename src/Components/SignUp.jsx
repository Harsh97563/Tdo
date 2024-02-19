import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios  from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { jwtTokenAtom } from '../State_Recoil/atom';
import { SignUpSchema } from '../Validations/UserValidation';
function SignUp() {
    const navigate= useNavigate()
    const [jwtToken, setJwtToken] = useRecoilState(jwtTokenAtom)
    const [Email, setEmail] = useState("")
    const [errormsg, setErrormsg] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [Password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const notify = () => toast.warning(`${errormsg}`, {
        autoClose: 1500,
    });

  return (
    <div className='w-[100vw] flex items-center justify-center  h-[100vh] bg-slate-700 '>
        <div className=' flex flex-col items-center rounded-3xl justify-between p-4 w-[30vw] h-[65vh] bg-zinc-400'>
            <div className='text-white text-5xl font-mono font-bold underline decoration-red-400'>Sign Up</div>
            <div className='flex w-[28vw]  flex-col'>
                <input className='p-2 rounded-lg m-2' placeholder='Email' type="text" onChange={(e)=>{
                    setEmail(e.target.value)
                }} />
                <input className='p-2 rounded-lg m-2' placeholder='First Name' type="text" onChange={(e)=>{
                    setFirstName(e.target.value)
                }} />
                <input className='p-2 rounded-lg m-2' placeholder='Last Name' type="text" onChange={(e)=>{
                    setLastName(e.target.value)
                }}/>
                <input className='p-2 rounded-lg m-2' placeholder='Password' type="text" onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                
            </div>
            <button className='bg-gray-700 w-[15vw] h-[6vh] flex rounded-lg justify-center items-center' onClick={async()=>{
                setLoading(true)
                const tempformdata= {
                    email: Email,
                    firstName: firstName,
                    lastName: lastName,
                    password: Password,
                }
                const schematest=await SignUpSchema.validate(tempformdata)
                    .then(() => console.log("Validation successful"))
                    .catch(async(error)=>{
                        await setErrormsg(error.message)
                        return false;
                    });
                if(!schematest){
                    notify()
                    setLoading(false)
                    return;
                }
                axios.post("https://todoudo.onrender.com/api/v1/user/SignUp", {
                    email: Email,
                    firstName: firstName,
                    lastName: lastName,
                    password: Password,
                })
                .then((res)=>{
                    setJwtToken(res.data.token)
                    localStorage.setItem('token', res.data.token)
                    navigate('/')
                    setLoading(false)
                }
                )
            }}>{loading ? <div class='w-[8vw] h-[6vh] flex space-x-2 justify-center items-center'>
            <span class='sr-only'>Loading...</span>
             <div class='h-4 w-4 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.5s]'></div>
           <div class='h-4 w-4 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
           <div class='h-4 w-4 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.1s]'></div>
       </div> : <div className='font-bold text-gray-900 font-mono text-xl'>Sign Up</div> }</button>
            <div>Already Signed Up? <span className='underline text-red-500'><a href="/SignIn">Login</a></span></div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default SignUp