import React from 'react'
import Header from '../Components/Header'
import TopReadsComp from '../Components/TopReadsComp'

import { useEffect } from 'react'


function TopReads() {
  useEffect(()=>{
    document.title = "Reads for you"
  },[])
  return (
    <div>
        <Header/>
        <TopReadsComp/>
    </div>
  )
}

export default TopReads