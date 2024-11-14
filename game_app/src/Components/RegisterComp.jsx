import React, { useState } from 'react'
import image from '../assets/images/RegisterPic.png'
import eye from '../assets/images/eye.svg'
import background from '../assets/images/backgroundTEST.svg'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { createUser } from '../Services/GlobalApi'

function RegisterComp() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()

    const [errMessage, setErrMessage] = useState();

    const [registerStatus, SetRegisterStatus] = useState(false)


    
    const [userId, setUserId] = useState();

    const navigate = useNavigate()



    function handleSubmit(event) {
        event.preventDefault();

        createUser(firstName, lastName, username, email, password).then((response)=>{
            console.log(response)
            console.log(response.data._id)
            navigate('/interests', {replace:true, state:{
                userId: response.data._id
            }})
        }).catch(err =>{
            console.log(err.response.status)
            if(err.response.status == 400 || err.response.status == 401) {
                SetRegisterStatus(true)
                setErrMessage(err.response.data.error)
                console.log(err.response.data.error)
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

                 
                
                {/* image */}
                <div  className='w-1/2 sm:block hidden'>
                    <img className='  rounded-2xl' src={`${image}`} alt="" />
                </div>
               
               
                {/* form */}
                <div className='sm:w-1/2 px-8'>
                    <h2 className='font-bold text-2xl text-[#161B33]'>Register</h2>
                    <p className='text-sm mt-4 font-poppins' >If you are new here, regsiter now!</p>

                    <form className='flex flex-col gap-4 group' onSubmit={handleSubmit} noValidate>
                        {/* First Name */}
                        <input className='p-2 mt-8 rounded-xl border peer' required  type="text" name='firstName' placeholder='First Name' pattern=".{1,}"
                        onChange={e =>setFirstName(e.target.value)} />
                        <span class=" ml-2 mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                         
                         </span>

                         {/* Last Name */}
                        <input className='p-2 rounded-xl border peer' required  type="text" name='lastName' placeholder='Last Name' pattern=".{1,}"
                        onChange={e =>setLastName(e.target.value)} />
                        <span class=" ml-2 mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                         
                         </span>
                        
                        {/* <img className='absolute top-1/2 right-3  -translate-y-1/2 opacity-40' src={`${eye}`} alt="" /> */}

                        {/* Username */}
                        <input className='p-2 rounded-xl border peer' required  type="text" name='username' placeholder='Username' pattern=".{3,}"
                        onChange={e =>setUsername(e.target.value)} />
                        <span class=" ml-2 mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                         Please enter a valid username
                         </span>

                        {/* Email */}
                         <input className='p-2 rounded-xl border peer' required  type="email" name='email' placeholder='Email' pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        onChange={e =>setEmail(e.target.value)} />
                        <span class=" ml-2 mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                         Please enter a valid Email
                         </span>
 
                         <div className='relative'>
                            {/* Password */}
                        <input className='p-2 rounded-xl border w-full peer' type="password" name='password' placeholder='Password' required pattern=".{8,}"
                        onChange={e =>setPassword(e.target.value)} />
                        <span class="ml-2 mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                         Please enter a valid password
                         </span>
                        </div>

                        <div className='relative'>
                            {/* RE-Password */}
                        <input className='p-2 rounded-xl border w-full peer' type="password" name='password' placeholder='Re-enter Password' required pattern={password}
                        onChange={e =>setRePassword(e.target.value)} />
                        <span class="ml-2 mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                         Passwords must match
                         </span>
                        </div>

 
                        <button type="submit" className='bg-[#161B33] text-white rounded-xl py-2 group-invalid:pointer-events-none group-invalid:opacity-30' onClick={()=>SetRegisterStatus(false)}>Register</button>
                        {
                           (()=>{
                                if(registerStatus == true){
                                    return(
                                        <h1 className='text-sm font-semibold font-poppins text-red-500 px-2 animate-pulse animate-duration-1000'>{errMessage}</h1>
                                    )
                                }
                           })()
                        }
                    </form>
                </div>
               
            </div>
        </section>
    </div>
        
    </body>
  )
}

export default RegisterComp