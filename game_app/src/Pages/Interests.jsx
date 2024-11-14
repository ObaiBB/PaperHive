import React, { useEffect } from 'react'
import Header from '../Components/Header'
import InterestComp from '../Components/InterestComp'

function Interests() {
  useEffect(()=>{
    document.title = "Choose your interests"
  },[])
  return (
    <div>
        <InterestComp/>
    </div>
  )
}

export default Interests