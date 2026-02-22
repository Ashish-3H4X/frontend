import React, { useState } from 'react';
import logo from "../assets/logo.png"
import { FaGoogle } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';

const Login = () => {
    const [show , setShow] = useState(false)
    const [email , setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [loading , setLoading ] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    const handleLogin = async () => {
       
          if (!email) {
    toast.error("Please enter your email");
    return;
  }
  if (!password) {
    toast.error("Please enter your password");
    return;
  }
     setLoading(true)
try {
   const result = await axios.post(serverUrl + "/api/auth/login",{email , password}, {withCredentials:true})
  //  console.log(result.data);
   dispatch(setUserData(result.data))
   setLoading(false)
    toast.success("Login Succesfully")
    navigate("/home")

} catch (error) {
   console.log(error.response.data);
   setLoading(false)
   toast.error(error.response?.data?.message)
}
    }
  // googlelogin setup

   const googlelogIn = async () => {
     try {
       const response = await signInWithPopup(auth , provider)
       let user = response.user
       let name = user.displayName
       let email = user.email

       const result  = await axios.post(serverUrl + "/api/auth/googleauthsignin",{name,email} ,{withCredentials:true})
       dispatch(setUserData(result.data))
               navigate("/")
               toast.success("Login  Succesfully")
     } catch (error) {
      console.log(error)
         toast.error(error.response?.data?.message)
     }
   }



  return (
      <div className="bg-[#f3ebeb] w-[100vw] h-[100vh] flex items-center justify-center">
          <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex '  onClick={(e)=>{e.preventDefault()}} >
               {/* left div */}
                    <div className='md:w-[50%] w-[100%] h-[100%] rounded-l-2xl bg-[black] md:flex items-center justify-center flex-col hidden'>
              <img src={logo} alt="logo" className='w-30 shadow-2xl' />
               <span className='text-[#ff00d0] text-2xl mt-4'>VIRTUAL <span className='text-[#10fb2c] text-2xl'>LEARNING </span></span>
               </div>
              
    
               {/* right div */}
              
               <div className="w-[100%] h-[100%] md:w-[50%]  md:rounded-l-2xl rounded-2xl flex flex-col items-center justify-center gap-3 bg-[#ffffff]">
               <div>
                <h1 className=' text-2xl font-semibold text-[#000000]'>Welcome back</h1>
                <h2 className='text-[18px] text-[#999797] tracking-wider '>Login your account </h2>
               </div>
     <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
    {/* name  here
     <label htmlFor="name" className='font-semibold'>Name</label>
     <input type="text" id='name' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'placeholder=" Enter your name"/> */}

     {/* email here */}
     <label htmlFor="email" className='font-semibold'>Email</label>
     <input type="email" id='email' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'placeholder="Enter your email " onChange={(e) => setEmail(e.target.value)} value={email} required/>
    {/* password here*/}
     <label htmlFor="password" className='font-semibold'>Password</label>
     <input type={show?"text" : "password"} id='password' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'placeholder=" Enter your password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
    {!show ? <IoEyeOff className='absolute w-[20px] h-[20px] cursor-pointer right-[7%] bottom-[5%]'onClick={()=> setShow(prev=>!prev)}/>:
    <IoEye className='absolute w-[20px] h-[20px] cursor-pointer right-[7%] bottom-[5%]'onClick={()=>setShow(prev=>!prev)}/>}
{/*     
    {/* rol start here  */}
     {/* <div className='flex md:w-[50%] w-[70%] items-center justify-around'>
      <span className=' px-[40px] py-[5px] border-[1px] mt-[7px] mr-[2px] border-[#aa9d9d] rounded-xl cursor-pointer  hover:bg-[#6ed0ca] ' >Student</span>
      <span className=' px-[40px] py-[5px] border-[1px] mt-[7px] mx-[10px] border-[#aa9d9d] rounded-xl cursor-pointer hover:bg-[#63e363]' >Educator</span>
     </div> */}
     {/* rol ending here */} 
     </div>
     {/* button */}
      <button className='w-[80%] h-[40px] bg-[#000000] text-white cursor-pointer flex items-center justify-center rounded-[5px]'  disabled={loading} onClick={handleLogin}>{loading? <ClipLoader size={30} color='white'/> :"Login" }</button>

      <span className='text-[13px] cursor-pointer text-[#585757]' onClick={()=> navigate("/forget")}>Forget your password ?</span>
         <div className='w-[80%] flex items-center gap-2'>
    
          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>

          <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or continue</div>
          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>
           
         </div>
    
    <div className=' w-[80%] h-[40px] border-1 border-[black] rounded-[5px] flex items-center justify-center cursor-pointer ' onClick={googlelogIn} >
      <FaGoogle  className='mr-2'/> <span>  Login  with google</span>
    </div>
    


<div className='text-[#282828]'>Create an account
  <span className='underline underline-offset-0 text-[black]  pl-[7px] pt-[30px] cursor-pointer'onClick={()=> navigate("/signup")}
>SignUp</span>
   </div>
               </div>
          </form>
        </div>
  );
}

export default Login;



