import React, { useState, useEffect } from 'react'
import image from '../assets/images/LoginPic.png'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLoading } from "react-icons/ai";
import { getSession, getUser } from '../Services/GlobalApi'
import Cookies from 'js-cookie';


function LoginComp() {

    useEffect(()=>{
        getSession().then((res)=>{
          if(res.data.valid){
            navigate('/')
          }else{
            navigate('/login')
          }
        })
      },[])

    axios.defaults.withCredentials = true;

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [errMessage, setErrMessage] = useState();

    const [loginStatus, SetLoginStatus] = useState(false)
    const [loading, setLoading] = useState(false)

    const [userId, setUserId] = useState();

    const navigate = useNavigate()


    function handleCookies(response){
        
        Cookies.set("username", response.data.username)
        Cookies.set("first_name", response.data.first_name)
        Cookies.set("last_name", response.data.last_name)
        Cookies.set("email", response.data.email)
        Cookies.set("history", response.data.history)
        Cookies.set("favorites", response.data.favorites)
        Cookies.set("interests", response.data.interests)
        

        return;

    }



    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        axios.post("http://localhost:3000/api/users/login", {username,password}).then(async res=>{
            setUserId(res.data.userID)
            console.log(res.data)
            setLoading(false);
            console.log(res.data.token)
            const userData = await getUser(res.data.userID, res.data.token)
            
            console.log(userData)
            try{
                handleCookies(userData)
            }catch(err){
                console.log(err)
            }
            Cookies.set("userId", res.data.userID)
            Cookies.set("token", res.data.token)
            navigate('/', {replace: true, state:{userId: res.data.userID}})
        }).catch(err=>{
            console.log(err.response.status)
            if(err.response.status == 400 || err.response.status == 401){
                setLoading(false);
                SetLoginStatus(true)
                setErrMessage(err.response.data.message)
                console.log(err.response.data.message)
            }
            console.log(err)
        })
    }

  return (
    <body>
    <div>
        <section className='bg-gray-50 h-full mt-8 flex items-center justify-center'>
            {/* Login container */}
            <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 z-50 '>
                {/* form */}
                <div className='sm:w-1/2 px-8'>
                    <h2 className='font-bold text-2xl text-[#161B33]'>
                         Login
                            </h2>
                    <p className='text-sm mt-4 font-poppins' >If you are already a member, log in now</p>

                    <form className='flex flex-col gap-4 group' onSubmit={handleSubmit} noValidate>
                        <input className='p-2 mt-8 rounded-xl border peer' required  type="text" name='username' placeholder='Username' pattern=".{3,}"
                        onChange={e =>setUsername(e.target.value)} />
                        <span class=" ml-2 mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                         Please enter a valid username
                         </span>
                        
                        <div className='relative'>
                        <input className='p-2 rounded-xl border w-full peer' type="password" name='password' placeholder='Password' required pattern=".{8,}"
                        onChange={e =>setPassword(e.target.value)} />
                        <span class="ml-2 mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                         Please enter a valid password
                         </span>
                        {/* <img className='absolute top-1/2 right-3  -translate-y-1/2 opacity-40' src={`${eye}`} alt="" /> */}
                        </div>
                        <div>
                            
                        </div>
                        <button type="submit" className='bg-[#161B33] text-white rounded-xl py-2 group-invalid:pointer-events-none group-invalid:opacity-30 justify-center items-center' onClick={()=>{SetLoginStatus(false), setLoading(true)}}>
                            {
                                loading ? <AiOutlineLoading className='text-white animate-spin ml-[138px] text-[24px]'/> : "Login"
                            }
                        </button>
                        {
                           (()=>{
                                if(loginStatus == true){
                                    return(
                                        <h1 className='text-sm font-semibold font-poppins text-red-500 px-2'>{errMessage}</h1>
                                    )
                                }
                           })()
                        }

                        <div className='mt-10 grid grid-cols-3 items-center text-gray-500'>
                            <hr className='border-gray-500'/>
                            <p className='text-center text-sm' >Or</p>
                            <hr className='border-gray-500'/>
                        </div>
                        <p className='text-sm mt-4 font-poppins' >If you are new here,</p>
                        <button className='bg-[#161B33] text-white rounded-xl py-2' onClick={()=>navigate('/register')}>Register Now</button>
                    </form>
                </div>
                {/* image */}
                <div  className='w-1/2 sm:block hidden'>
                    <img className='  rounded-2xl' src={`${image}`} alt="" />
                </div>
            </div>
        </section>
    </div>
        
    </body>
  )
}

export default LoginComp