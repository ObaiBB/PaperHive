import React, { useEffect, useState } from 'react'

import Header from '../Components/Header'
import Search from '../Components/Search'
import Description from '../Components/Description'
import { getSession } from '../Services/GlobalApi'
import { useNavigate } from 'react-router-dom'

import homepage from '../assets/images/Homepage1.svg'
import homepage2 from '../assets/images/Homepage2.svg'
import homepage3 from '../assets/images/ProfilePic4.png'
import homepage4 from '../assets/images/Homepage4.svg'


function Home() {

  const navigate = useNavigate();

  const [userId, setUserid] = useState()

  useEffect(()=>{
    document.title = "PaperHive"
    getSession().then((res)=>{
      if(res.data.valid){
        setUserid(res.data.userId)
      }else{
        // navigate('/login')
      }
    })
  },[])
  

  return (
    <div className='relative'>
      <title>PaperHive</title>
      <Header/>
      <Search/>
      <div className='font-poppins'>
        <div className='absolute bottom-1 right-1'>
        <img src={homepage} className='w-[350px] mr-[300px] mb-[1100px]   mt-[0px] ' alt="" />
        </div>

        <div className='absolute -left-36'>
          <img src={homepage2} className='w-[1000px] mt-[200px]' alt="" />
        </div>

        
        <div className='absolute right-1 mr-[200px] mt-[650px]'>
          <img src={homepage3} className='w-[500px] ' alt="" />
        </div>

        <div className='absolute left-14  mt-[1100px]'>
          <img src={homepage4} className='w-[500px]' alt="" />
        </div>


        <div className='ml-[100px] mr-[750px] mt-[200px]'>
          <h1 className='font-bold text-[32px]'>Innovative research tool</h1>
          <h1 className='mt-2 text-[20px] opacity-60'>It combines the power of Semantic Scholar with cutting-edge AI technology to offer researchers a comprehensive platform for literature exploration and knowledge discovery.</h1>
        </div>

        <div className='ml-[750px] mr-10 mt-[300px]'>
          <h1 className='font-bold text-[32px]'>Recommendation System</h1>
          <h1 className='mt-2 text-[20px] opacity-60'>Our platform features an AI-powered recommendation system that suggests relevant research papers tailored to your interests, creating a personalized and efficient research experience.</h1>
        </div>

        <div className='ml-[100px] mr-[750px] mt-[200px]'>
          <h1 className='font-bold text-[32px]'>A Hive full of nectar</h1>
          <h1 className='mt-2 text-[20px] opacity-60'>PaperHive provides a visual representation of the literature map in the form of a hive-shaped graph, enhancing your understanding of research landscapes.</h1>
        </div>

        <div className='ml-[700px] mr-[100px] mt-[250px]'>
          <h1 className='font-bold text-[32px]'>Paraphrasing tool</h1>
          <h1 className='mt-2 text-[20px] opacity-60'>PaperHive includes a paraphrasing tool to assist you in your academic writing endeavors. </h1>
        </div>

      </div>
    </div>
  )
}

export default Home