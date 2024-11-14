import React, { useContext, useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5"

import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getSession, logOut } from '../Services/GlobalApi'
import { Profile, Heart, Clock, LogoutCurve } from 'iconsax-react'


//import {default as paperHive} from '../assets/images/PaperHive1.svg';
import {default as paperHive} from '../../../../Creative Work/PaperHiveSVG!-cropped.svg';
import Cookies from 'js-cookie'



function Header() {

  const navigate = useNavigate()

  function handleLogOut(){
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

    logOut().then((response) =>{
      console.log(response)
    })

    navigate('/', {replace: true})
    navigate(0)
  }

  const [userId, setUserId] = useState();
  //Got USERID when loggedIn, save to LocalStorage for later Use
  useEffect(()=>{
    getSession().then((res)=>{
        if(res.data.valid){
          setUserId(res.data.userId)
        }
    })
  },[])


  return (
    <div className='flex flex-row justify-between items-center px-10 shadow-md w-full pointer-events-auto overflow-visible'>
      <div>
        <Link to="/">
        <img className=' w-36 py-2 px-3' src={paperHive} alt="" />
        </Link>
  
      </div >
        <div className='overflow-visible font-poppins flex gap-10 justify-center items-center mr-6'>
            <Link to="/" >
            <h1 className='cursor-pointer hover:text-[#6B7FD7] transition-colors duration-200'>Home</h1>
            </Link>

            <Link to="/paraphrase" >
            <h1 className='cursor-pointer hover:text-[#6B7FD7] transition-colors duration-200'>Paraphrase</h1>
            </Link>
            {
              userId!=null ? <Link to="/topreads">
              <h2 className='cursor-pointer hover:text-[#6B7FD7] transition-colors duration-200'>Reads for you</h2>
              </Link> : ""
            }
            
            {
              userId!=null ? 
              <div className="dropdown dropdown-hover ">
              <div tabIndex={0} role='button' className="bg-[#f5fafafa] hover:text-[#6B7FD7] hover:bg-[#f5fafafa] outline-none border-none m-1 btn">Profile</div>

              <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-[130px]">

                <Link to={'/profile/' + userId}>
                <li><div>
                  <Profile size="15" color='#6B7FFB' />
                <a>Account</a>
                  </div></li>
                </Link>

                <Link to={'/favorites/' + userId}>
                <li><div>
                <Heart size="15" color='#6B7FFB' />
                <a>Favorites</a>
                </div>
                  </li>
                </Link>

                <Link to={'/history/' + userId} replace={false}>
                <li className='mb-1'><div>
                  <Clock size="15" color='#6B7FFB' />
                  <a>History</a>
                  </div></li>
                </Link>

                  <hr className='mx-2 w-24' />

                  <li className='mt-2' onClick={()=>{
                    handleLogOut()
                  }}><div>
                  <LogoutCurve size="15" color='#6B7FFB' />
                  <a>Log out</a>
                  </div></li>


              </ul>
            </div> : 
              
              <Link to="/login">
              <h3 className='cursor-pointer hover:text-[#6B7FD7] transition-colors duration-200 mr-10'>Login</h3>
              </Link>
            }
            
            
        </div>
             


        {/* <div className='dropdown dropdown-hover z-10'>
              <div tabIndex={0} role="button" className="btn m-1 hover:text-[#6B7FD7] hover:bg-[#F5f5f5] mr-7">Profile</div>
              <ul tabIndex={0} className=" dropdown-content z-1 menu shadow bg-base-100 rounded-box w-[138px] h-fit pointer-events-auto pr-14">
                  <Link to={'/profile/' + userId}>
                  <li className='mr-9'><div className=''>
                <Profile
                  size="15"
                  color="#FF8A65"
                  className='mr-1'
                  />
                  <a>Account</a>
                  </div></li>
                  </Link>
                

                <li className='mr-9'><div>
                <Heart
                size="15"
                color="#FF8A65"
                className='mr-1'
                />  
                <a>Favorites</a>
                  </div></li>
                <li className='mr-9'><div>
                
                  <Clock
                  size="15"
                  color="#FF8A65"
                  className='mr-1'
                  />
                <a>History</a>
                  </div></li>
                  
                  
                  
                  <li className='mr-9'>
                    <div>
                      <LogoutCurve
                        size="15"
                        color="#FF8A65"
                        className='mr-1'

                      />
                      <a>Log out</a>
                    </div>

                  </li>

              </ul>
              </div> */}
       
       
       
        {/* <div className='flex bg-slate-200 p-2 w-full center mx-5 rounded-full'>
                <IoSearchSharp className='mt-1 ml-3'/>
                <input className='bg-transparent outline-none px-2 w-full' type="text" placeholder='Search Games' />
        </div> */}
      
    </div>
  )
}

export default Header