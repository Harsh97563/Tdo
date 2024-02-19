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
    <div className='w-[100vw] flex items-center justify-center  h-[100vh] bg-emerald-400 '>
        <section>
            <div class="absolute fill-teal-900 top-0 left-0 w-[100vw] overflow-hidden">
                <svg className='relative block w-[142vw] h-[123px]' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                </svg>
            </div>
        </section>
        <div className=' flex flex-col items-center rounded-3xl justify-between p-4 w-[90vw] md:w-[30vw] h-[40vh] md:h-[65vh] bg-teal-900'>
            <div className='text-white text-5xl font-mono font-bold underline decoration-lime-400'>Sign In</div>
            <div className='flex w-full  flex-col'>
                <input className='p-2 placeholder-opacity-80 rounded-lg m-2 focus:bg-green-300 focus:outline-none' placeholder='Email' type="text" onChange={(e)=>{
                    setEmail(e.target.value)
                }} />
                <input className='p-2 placeholder-opacity-80 rounded-lg m-2 focus:bg-green-300 focus:outline-none' placeholder='Password' type="text" onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                
            </div>
            <button className='bg-teal-700 w-[70vw] md:w-[15vw] h-[6vh] flex rounded-lg justify-center items-center' onClick={async()=>{
                setLoading(true)
                const tempformdata= {
                    email: Email,
                    password: Password,
                }
                const schematest=await SignInSchema.validate(tempformdata)
                .then(() => {
                    return true;
                })
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
                    localStorage.setItem('token', res.data.token)
                    navigate("/")
                }
                ).catch((error)=>{
                    try {
                        notify(error.response.data.msg);
                        console.log(error.response.data.msg);
                        
                    } catch (error) {
                        notify("Please try again in a minute.");
                    }
                }).finally(()=>{
                    setLoading(false)
                })
            }}>{loading ? <div class='w-[8vw] h-[6vh] flex space-x-2 justify-center items-center'>
            <span class='sr-only'>Loading...</span>
             <div class='h-4 w-4 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.5s]'></div>
           <div class='h-4 w-4 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
           <div class='h-4 w-4 bg-gray-900 rounded-full animate-bounce [animation-delay:-0.1s]'></div>
       </div> : <div className='font-bold text-white font-mono text-xl'>Sign In</div> }</button>
            <div className='text-white'>Doesn't have an Account? <span className='underline font-bold text-lime-500'><a href="/SignUp">Sign Up</a></span></div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default SignIn