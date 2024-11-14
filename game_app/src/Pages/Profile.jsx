import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import profilePic from '../assets/images/ProfilePic4.png'
import profileHive from '../assets/images/Profile2.png'


import { useParams } from 'react-router-dom'
import ProfileComp from '../Components/ProfileComp'

function Profile() {

  useEffect(()=>{
    document.title = "Profile"
  },[])

  const {id} = useParams()
  console.log(id)

  return (
    <div className='relative'>
      
        <Header/>
        <div className='absolute  mt-[70px]'>
          <img src={profilePic} className='w-[500px] opacity-50' alt="" />
        </div>
        <div className='absolute bottom-1 right-1 m-[100px]'>
          <img src={profileHive} className='w-[350px] opacity-50' alt="" />
        </div>
        <ProfileComp userId={id}/>
    </div>
  )
}

export default Profile