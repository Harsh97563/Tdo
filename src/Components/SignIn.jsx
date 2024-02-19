import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { SignInSchema } from '../Validations/UserValidation';
function SignIn() {
    const navigate= useNavigate()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const notify = (msg) => toast.warning(`${msg}`, {
        autoClose: 1500,
    });

  return (
    <div className='w-[100vw] flex items-center justify-center  h-[100vh] bg-slate-700 '>
        <div className=' flex flex-col items-center rounded-3xl justify-between p-4 w-[30vw] h-[65vh] bg-zinc-400'>
            <div className='text-white text-5xl font-mono font-bold underline decoration-red-400'>Sign In</div>
            <div className='flex w-[28vw]  flex-col'>
                <input className='p-2 rounded-lg m-2' placeholder='Email' type="text" onChange={(e)=>{
                    setEmail(e.target.value)
                }} />
                <input className='p-2 rounded-lg m-2' placeholder='Password' type="text" onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                
            </div>
            <button className='bg-gray-700 w-[15vw] h-[6vh] flex rounded-lg justify-center items-center' onClick={async()=>{
                setLoading(true)
                const tempformdata= {
                    email: Email,
                    password: Password,
                }
                const schematest=await SignInSchema.validate(tempformdata)
                    .then(() => console.log("Validation successful"))
                    .catch((error)=>{
                        notify(error.message)
                        return false;
                    });
                if(!schematest){
                    setLoading(false)
                    return;
                }
                axios.post("https://todoudo.onrender.com/api/v1/user/SignIn", {
                    email: Email,
                    password: Password,
                })
                .then((res)=>{
                    console.log(res.data);
                    localStorage.setItem('token', res.data.token)
                    setLoading(false)
                    navigate("/")
                }
                ).catch((error)=>{
                    console.log(error);
                    setLoading(false)
                })
            }}>{loading ? <div class='w-[8vw] h-[6vh] flex space-x-2 justify-center items-center'>
            <span class='sr-only'>Loading...</span>
             <div class='h-4 w-4 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.5s]'></div>
           <div class='h-4 w-4 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
           <div class='h-4 w-4 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.1s]'></div>
       </div> : <div className='font-bold text-gray-900 font-mono text-xl'>Sign In</div> }</button>
            <div>Doesn't have an Account? <span className='underline text-red-500'><a href="/SignUp">Sign Up</a></span></div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default SignIn