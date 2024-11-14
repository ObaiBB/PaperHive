import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { IoLockClosed } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";

import { addHistory } from '../Services/GlobalApi';
import Cookies from 'js-cookie';


const PrimaryResults = ({results}) => {

    const navigate = useNavigate()
    
    var renderedResults = results.map((item, index)=>{
       return <div className='group w-full' onClick={()=>{
            //Check if user is logged in by the existence of cookies.
            if(Cookies.get("userId")){
              addHistory(Cookies.get("userId"), item["_paperId"])
            }
            navigate('/paper/' + item["_paperId"])
       }}><div className='bg-slate-200 shadow-xl rounded-2xl w-full place-items-start p-8 group-hover:bg-[#FFE066]  duration-300 transition-colors cursor-pointer'>
       <div className='group-hover:text-white transition-colors duration-300'>
            {
                item['_openAccessPdf'] ? <div className='flex gap-8'>

                  <div className='flex items-center mb-3 glass w-fit rounded-xl px-3'>
                                  <IoLockOpenOutline/>
                                  <h1 className='ml-2'>PDF link available</h1>
                                  </div>

                                  <div className={`w-[75px] h-[25px] mt-0 ${item["_citationCount"]>=20 ? "bg-[#161B33]" : ""} ${item["_citationCount"] < 20 && item["_citationCount"] >= 10 ? "bg-[#6B7FFB]" : ""} ${item["_citationCount"] < 10 ? "bg-[#FFE066]" : ""} rounded-full text-center`}>
                    <h1 className='text-white text-[12px] font-poppins mt-[4px]'>{item["_citationCount"]}</h1>
                  </div>


                </div>  : <div className='flex gap-2'>
                      <div className='flex items-center mb-3 glass w-fit rounded-xl px-3'>
                  <IoLockClosed/>
                  <h1 className='ml-2'>PDF link un-available</h1>
                  </div>
                  <div className={`w-[75px] h-[25px] mt-0 ${item["_citationCount"]>=20 ? "bg-[#161B33]" : ""} ${item["_citationCount"] < 20 && item["_citationCount"] >= 10 ? "bg-[#6B7FFB]" : ""} ${item["_citationCount"] < 10 ? "bg-[#FFE066]" : ""} rounded-full text-center`}>
                    <h1 className='text-white text-[12px] font-poppins mt-[4px]'>{item["_citationCount"]}</h1>
                  </div>
                </div> 
            }
            <h1 className='font-poppins font-semibold '>{item["_title"]}</h1>
           <h1>{item["_year"]}</h1>
           <div className=' grid grid-cols-5 place-content-start gap-2 mt-3 group-hover:text-black transition-colors duration-300 '>
           {item["_authors"].map((author)=> <div className='w-full h-fit text-[16px] bg-white rounded-xl p-3 mr-3 mt-2 shadow-md text-center'> {author["name"]} </div> )}

           </div>
            </div>
       </div></div> 
    })
    console.log(results)


  return (
    <div className=' relative w-full shadow-2xl rounded-2xl pl-10 pr-[125px] pt-9 pb-9 bg-slate-100 grid grid-cols-1 gap-10 place-items-center'>
        
        {renderedResults}
        
    </div>
  )
}

export default PrimaryResults