import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useLocation, useSearchParams } from 'react-router-dom'
import PrimaryResults from '../Components/PrimaryResults'
import RecommendedResults from '../Components/RecommendedResults'

const SearchResults = () => {

  useEffect(()=>{
    document.title = queryParameters.get("query")
  },[])

    const [queryParameters] = useSearchParams();
    const query = queryParameters.get("query")
    const location = useLocation()

    console.log(location.state)

    

  return (
    <div>
        <Header/>
        {/* --className Div-- */}
        <div className='relative'>
        <div className='pl-28 pt-5 justify-center items-center scroll-auto'>
        <div className='pl-5'>
        <h1 className='font-semibold text-[16px] font-poppins'>Search for:</h1>
        <h1 className='font-bold text-[32px] font-poppins'>{query}</h1>
        <div className='absolute top-1 right-1 flex gap-2 justify-center items-center mr-[135px] mt-[50px]'>
        <div className='w-[30px] h-[30px] rounded-full bg-[#161B33]'></div>
        <div className='w-[30px] h-[30px] rounded-full bg-[#6B7FFB]'></div>
        <div className='w-[30px] h-[30px] rounded-full bg-[#FFE066]'></div>
        <h1 className='font-poppins font-semibold'>: Citation Count</h1>
        </div>
        </div>
        <PrimaryResults results={location.state} />
        </div>

        </div>

    </div>
  )
}

export default SearchResults