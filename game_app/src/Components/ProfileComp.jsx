import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { ProfileCircle, Edit, Heart, Clock, CardEdit, Zoom } from 'iconsax-react';
import Lottie from 'react-lottie';
import SurveyAnimation from '../assets/survey.json';
import { checkTaken, getUser, logOut, updateUser } from '../Services/GlobalApi';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

const ProfileComp = ({userId}) => {

    const notify = () => toast.error("Username is already taken!", {
        position:"top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "colored"

    });
    


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: SurveyAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [interests, setInterests]= useState([])


    const [uUsername, setUUsername] = useState("");
    const [uEmail, setUEmail] = useState("");
    const [uFirstName, setUFirstName] = useState("");
    const [uLastName, setULastName] = useState("");
    const [uPassword, setUPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const navigate = useNavigate();

    function handleUpdate(event){
        event.preventDefault();

        var mFN = "";
        var mLN = "";
        var mEmail = "";
        var mUsername = "";

        if(uUsername.length == 0){
            
            mUsername = Cookies.get("username")
           
        }else{
            mUsername = uUsername
            setUsername(mUsername)
        }
        if(uFirstName.length == 0){
          
            mFN = Cookies.get("first_name")
           
        }else{
            mFN = uFirstName
            setFirst_name(mFN)
        }
        if(uLastName.length == 0){
            
            mLN = Cookies.get("last_name")
           
        }else{
            mLN = uLastName
            setLast_name(mLN)
        }
        if(uEmail.length == 0){
            
            mEmail = Cookies.get("email")
        
        }else{
            mEmail = uEmail
            setEmail(mEmail)
        }

        if(mUsername == Cookies.get("username")){
            
            updateUser(userId, mFN, mLN, mUsername, mEmail, uPassword).then((response)=>{
                if(response.status == 200){

                    Cookies.set("first_name", mFN)
                    Cookies.set("last_name", mLN)
                    Cookies.set("email", mEmail)
  
                }else{
                    //Show error message
                    <div role="alert" id='server-error' className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Error 500! Internal Error </span>
                    </div>
                    document.getElementById("server-error").open();
                }
            }).then(()=>{
                console.log("HERE")
                

            })
        }else{
            checkTaken(uUsername).then(async (response)=>{
                if(response.status == 205){
                    //Show username is taken message
                    document.getElementById('my_modal_2').close()
                    notify();
                     
                }else if(response.status == 200){
                    //Do nothing jsut update
                    await updateUser(userId, mFN, mLN, mUsername, mEmail, uPassword).then(()=>{
                        
                       return;  
                    }).then(()=>{
                        Cookies.set("username", mUsername)
                        Cookies.set("first_name", mFN)
                        Cookies.set("last_name", mLN)
                        Cookies.set("email", mEmail)
                    }).then(()=>{
                        document.getElementById('my_modal_2').close()

                    })

                }
            })
        }

    }



    function handleCookies(){

        setUsername(Cookies.get("username"))
        setFirst_name(Cookies.get("first_name"))
        setLast_name(Cookies.get("last_name"))
        setEmail(Cookies.get("email"))

        console.log(Cookies.get("interests"))
        const mInterests = Cookies.get("interests").split(',')
        setInterests(mInterests)
        console.log(mInterests)

    }

    function handleRemoveCookies(){
        Cookies.remove("userId");
        Cookies.remove("interests");
        Cookies.remove("history");
        Cookies.remove("email");
        Cookies.remove("connect.sid");
        Cookies.remove("favorites");
        Cookies.remove("username");
        Cookies.remove("first_name");
        Cookies.remove("last_name");
        Cookies.remove("token");
    }

    function getCookieValue(name) {
        return new Promise((resolve) => {
            const token = Cookies.get(name);
            resolve(token);
        });
    }

    async function handleAuth(){
        const token = Cookies.get("token")
        
        console.log(token)
        const username = Cookies.get("username")
        console.log(username)
        const userData = getUser(Cookies.get("userId"), Cookies.get("token"))
        console.log("Hello mom")
        userData.then((response)=>{
            console.log(response)
            if(!Cookies.get("token")){
                console.log("Im here, Client deleted token")
                handleRemoveCookies();
                logOut();
                navigate('/login', {replace:true})
            }
            
        }).catch(err=>{
            console.log(err)
            if(err.response.status == 401 || err.response.status == 403){
                console.log("Unauthorized")
                handleRemoveCookies();
                logOut();
                navigate('/login')
            }
        })
        
    }
    


    useEffect(()=>{
        //setLoading(true)
        console.log("hello")
        handleAuth();
        if(Cookies.get("username")){
            console.log(Cookies.get("token"))
        }
        handleCookies();
        
    },[])

  return (
    <div className='flex justify-center items-center '>
        <ToastContainer
            position='top-center'
            autoClose={3000}
            limit={1}
            theme='colored'
            closeOnClick
        />
        <div className=' transition-colors duration-700 mx-[480px] mt-14 bg-slate-100 shadow-2xl rounded-2xl w-full h-[550px] relative'>
            
            <div className='flex justify-center items-center mt-4 '>
            <ProfileCircle
                size="96"
                color="#161B33"

                />
                <div className='absolute right-1 top-1 m-3'>
                <Edit
                size="26"
                
                className="justify-end text-[#161B33] hover:text-[#FFE066] transition-colors duration-150 cursor-pointer"

                onClick={()=>{
                    document.getElementById('my_modal_2').showModal()
                }}
                />
                </div>
            </div>
            <div> 
                <div className='flex justify-center gap-1 mt-2 text-3xl text-[#161B33] font-poppins font-semibold'>
                     <h1 className='text-center'>{first_name}</h1>
                     <h1 className='text-center'>{last_name}</h1>
                </div>
                <div>
                    <h1 className='text-center text-slate-500'>@{username}</h1>
                </div>
            </div>
            <div className='flex justify-around mt-5 mx-20'>
                <div className='btn btn-outline border-[#161B33] text-[#161B33] w-40 hover:bg-[#161B33] group hover:text-white' onClick={()=>{
                    navigate('/favorites/' + userId)
                }}>
                    <Heart size="20" color='red' className='border-red-600 group-hover:fill-red-500' />
                    View Favorites
                    </div>

                    <div className='btn border-[#161B33] text-[#161B33] w-40 hover:bg-[#161B33] hover:text-white' onClick={()=>{
                        navigate('/history/'+userId)
                    }}>
                    <Clock size="20" className='border-pink-500' />
                    View History
                    </div>
            </div>
            {
                Cookies.get("interests").length == 0 ?
                
                <div className='m-10'>
                    <div className='bg-slate-200 w-full rounded-lg h-40 mt-2 flex'>
                        <div className='m-6 box-content'>
                        <Lottie  options={defaultOptions} width={115} height={115}   />
                        </div>
                        <div className=''>
                            <h1 className='mt-6 mr-5 font-poppins text-sm opacity-80'>Have you completed the interests survey yet?</h1>
                            <div className='btn btn-secondary h-4 text-white mt-3 ml-7' onClick={()=>{
                                navigate('/interests', {replace: true, state:{
                                    userId: userId
                                }})
                            }}>
                                Click here to do it now!
                            </div>
                        </div>
                    </div>
                </div> 
                
                : 
                
                <div className='m-10'>

                <div className='flex relative'>

                <h1 className='font-poppins font-semibold text-sm ml-2'>
                    My interests
                </h1>

                <CardEdit className='absolute right-1 hover:text-[#FFE066] transition-colors duration-150 cursor-pointer' size={20} onClick={()=>{
                    navigate('/interests', {replace: false, state:{
                        userId: userId
                    }})
                }} />
                    </div>
                
                <div className='rounded-box border-slate-400 outline outline-slate-300 overflow-clip w-full h-52 mt-2 p-2'>
                    <div className='grid grid-cols-4 grid-rows-5 place-items-center place-content-center'>
                        {interests.map(item => <div className='overflow-clip font-poppins font-semibold text-[12px] shadow-md justify-center items-center text-center h-fit rounded-2xl py-3 px-2 w-fit'>
                            <h1>{item}</h1>
                            </div>)}
                    </div>
                </div>

            </div>
            }



            {/* EDIT DIALOG */}

            <dialog id='survey-edit' className='modal'>
                <div className='modal-box font-poppins'>
                    <h3>Would you like to retake the survey?</h3>
                </div>
            </dialog>

            <dialog id="my_modal_2" className="modal">
            <div className="modal-box font-poppins w-80">
                <h3 className="font-bold text-lg mb-8 ml-4 ">Edit profile</h3>
                
                <form action="" onSubmit={handleUpdate} className='flex flex-col gap-y-5'>

                {/* USERNAME */}
                <div className='flex items-center ml-4'>  
                <div className=' mr-4 text-sm gap-3 items-center'>
                <h4 className='text-[13px] ml-1 text-slate-400'>Username</h4>
                <input type="text" className='p-2 rounded-xl border peer w-[235px]' placeholder={username} pattern='.{3,}' onChange={e =>{setUUsername(e.target.value)}}/>
                </div>
                
                </div>
                
                {/* FIRST NAME */}
                <div className='flex items-center ml-4'>  
                <div className=' mr-4 text-sm gap-3 items-center'>
                <h4 className='text-[13px] ml-1 text-slate-400'>First name</h4>
                <input type="text" className='w-[235px] p-2 rounded-xl border peer' placeholder={first_name} pattern='.{1,}' onChange={e =>{setUFirstName(e.target.value)}}/>
                </div>
                
                </div>

                {/* LAST NAME */}
                <div className='flex items-center ml-4'>  
                <div className=' mr-4 text-sm gap-3 items-center'>
                <h4 className='text-[13px] ml-1 text-slate-400'>Last name</h4>
                <input type="text" className='w-[235px] p-2 rounded-xl border peer' placeholder={last_name} pattern='.{1,}' onChange={e =>{setULastName(e.target.value)}}/>
                </div>
                
                </div>

                {/* EMAIL */}
                <div className='flex items-center ml-4'>  
                <div className=' mr-4 text-sm gap-3 items-center'>
                <h4 className='text-[13px] ml-1 text-slate-400'>Email</h4>
                <input type="text" className='w-[235px] p-2 rounded-xl border peer' placeholder={email} pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" onChange={e =>{setUEmail(e.target.value)}}/>

                <span class=" ml-2 mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                         Please enter a valid Email
                         </span>
                </div>
                
                </div>


                {/* PASSWORD */}
                <div className='flex items-center ml-4'>  
                <div className='flex flex-col mr-4 text-sm gap-3 items-center'>
            
                <input type="password" className='w-[235px] p-2 rounded-xl border peer' placeholder='Password' pattern='.{6,}' onChange={e =>{setUPassword(e.target.value)}}/>
                <span class="ml-0 mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                         Please enter a valid password
                         </span>
                </div>
                
                
                
                </div>

                {/* RE-ENTER PASSWORD */}
                <div className='flex flex-col mr-4 ml-4 text-sm gap-3 items-center'>
                
                <input type="password" className='w-[235px] p-2 rounded-xl border peer'  placeholder='Re-password' pattern={uPassword} onChange={e =>{setRePassword(e.target.value)}}/>
                <span class="ml-2 mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                         Passwords must match
                         </span>
                </div>
                
                <button type='submit' className='bg-[#161B33] mt-2 text-white rounded-xl py-3 group-invalid:pointer-events-none group-invalid:opacity-30'>Update</button>
                </form>

            </div>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>
        </div>
    </div>
  )
}

export default ProfileComp