import React, { useState } from 'react';
import logo from "../assets/logo.png"
import bgImage from "../assets/home.png";
import { FaGoogle } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import {ClipLoader} from 'react-spinners'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';

const SignUp = () => {
  const [show , setShow] = useState(false)
  const navigate = useNavigate()
  const [name, setName]= useState("")
  const [email , setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [role, setRole]= useState("student")
  const [loading , setLoading ] = useState(false)
  const dispatch = useDispatch()

   const handleSignup = async () => {
     setLoading(true)
   try {
     
    const result = await axios.post(serverUrl + "/api/auth/signup" , {name , password , email , role },{withCredentials:true})
              dispatch(setUserData(result.data))
               setLoading(false)
               navigate("/")
               toast.success("Signup Succesfully")
   } catch (error) {
      setLoading(false)
      toast.error(error.response?.data?.message)
   }
   }

   const googleSignUp = async () => {
     try {
       const response = await signInWithPopup(auth , provider)
       let user = response.user
       let name = user.displayName
       let email = user.email

       const result  = await axios.post(serverUrl + "/api/auth/googleauthsignup" ,{name,email,role} ,{withCredentials:true})
       dispatch(setUserData(result.data))
               navigate("/home")
               toast.success("Signup Succesfully")
     } catch (error) {
      console.log(error)
         toast.error(error.response?.data?.message)
     }
   }
  return (
    <div  className="w-[100vw] h-[100vh] flex items-center justify-center bg-[#f3ebeb]">
      <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex' onSubmit={(e)=>e.preventDefault()} >
           {/* left div */}
          
           <div className="w-[100%] h-[100%] md:w-[50%]  md:rounded-l-2xl rounded-2xl flex flex-col items-center justify-center gap-3 bg-[#ffffff]">
           <div>
            <h1 className=' text-2xl font-semibold text-[black]'>Let's  get Started</h1>
            <h2 className='text-[18px] text-[#999797] tracking-wider '>Create your account </h2>
           </div>
 <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>

 <label htmlFor="name" className='font-semibold'>Name</label>
 <input type="text" id='name' className='border w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'placeholder=" Enter your name" onChange={(e) => setName(e.target.value)}
  value={name}/>

 <label htmlFor="email" className='font-semibold'>Email</label>
 <input type="email" id='email' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'placeholder="Enter your email " onChange={(e) => setEmail(e.target.value)}
  value={email}/>
{/* password here*/}
 <label htmlFor="password" className='font-semibold'>Password</label>
 <input type={show?"text" : "password"} id='password' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'placeholder=" Enter your password"onChange={(e) => setPassword(e.target.value)}
  value={password}/>
{!show ? <IoEyeOff className='absolute w-[20px] h-[20px] cursor-pointer right-[7%] bottom-[22%]'onClick={()=> setShow(prev=>!prev)}/>:
<IoEye className='absolute w-[20px] h-[20px] cursor-pointer right-[7%] bottom-[22%]'onClick={()=>setShow(prev=>!prev)}/>}

{/* rol start here  */}
 <div className='flex md:w-[50%] w-[70%] items-center justify-around'>
  <span className={`px-[40px] py-[5px] border-[2px] mt-[7px] mr-[2px]  rounded-xl cursor-pointer ${role === "student" ? " border-[#00ff37]":"border-[#000000]"}`}onClick={() => setRole("student")} >Student</span>
  <span className={`px-[40px] py-[5px] border-[2px] mt-[7px] mr-[2px] rounded-xl cursor-pointer  ${role === "educator" ? " border-[#ff5016]":"border-[#000000]"}`}onClick={() => setRole("educator")}>Educator</span>
 </div>
 {/* rol ending here */}
 </div>
 {/* button */}
  <button className='w-[80%] h-[40px] bg-[#000000] text-white cursor-pointer flex items-center justify-center rounded-[5px]'onClick={handleSignup} disabled={loading}> {loading? <ClipLoader size={30} color='white'/> :"SignUp" }</button>
     <div className='w-[80%] flex items-center gap-2'>

      <div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>
      <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or continue</div>
      <div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>
       
     </div>

<div className=' w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center cursor-pointer ' onClick={googleSignUp}>
  <FaGoogle  className='mr-2'/> <span>  Signup  with google</span>
</div>



<div className='text-[#000000]'>already have an account
  <span className='underline underline-offset-1 text-[black] pl-[7px] pt-[30px] cursor-pointer' onClick={()=> navigate("/login")}
>Login</span>
   </div>

           </div>

           {/* right div */}
           <div className='md:w-[50%] w-[100%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden'>
          <img src={logo} alt="logo" className='w-30 shadow-2xl' />
           <span className='text-[#ff00d0] text-2xl mt-4'>VIRTUAL <span className='text-[#10fb2c] text-2xl'>LEARNING </span></span>
           </div>
      </form>
    </div>
  );
}

export default SignUp;
