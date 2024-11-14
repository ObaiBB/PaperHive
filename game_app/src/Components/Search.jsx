import React, { useState } from 'react'
import researchguy from '../assets/images/research.svg'
import hive from '../assets/images/hive.svg'
import Hexagon from '../constants/Hexigon'
import SearchBar from './SearchBar'

function Search() {
  return (
    
    <div>
        
        <div className='flex justify-end pt-6 pr-3'>
        <img src={`${hive}`} className='absolute h-[700px] opacity-10 overflow-hidden' alt="" />
        </div>
        <div className='pt-44 flex justify-center items-center '>
            <h1 className='font-poppins font-bold text-[24px]' >Explore the nectar of knowledge</h1>
        </div>
        <SearchBar/>
        <div className='container opacity-40 ml-32 mb-9'>
            <div className='hex_HIGH pos0 animate-jump animate-duration-[3000ms] hover:animate-pulse'></div>
            <div className='hex_LOW pos1 animate-jump animate-duration-[7000ms] animate-infinite'></div>
            <div className='hex_MED pos2' ></div>
            <div className={`hex_HIGH pos3 animate-jump animate-duration-[5000ms]hover:animate-pulse` }></div>
            <div className='hex_HIGH pos4 animate-jump animate-duration-[1000ms] hover:animate-pulse'></div>
            <div className='hex_LOW pos5 animate-jump animate-duration-[8000ms] animate-infinite' ></div>
            <div className='hex_MED pos6 animate-jump animate-duration-[2000ms] hover:animate-pulse'></div>
        </div>
    </div>
  )
}

export default Search