import React, { useEffect } from 'react'
import Header from '../Components/Header'
import ParaphraseComp from '../Components/ParaphraseComp'

function Paraphrase() {
  useEffect(()=>{
    document.title = "Paraphrase"
  },[])
  return (
    <div>
        <Header/>
        <ParaphraseComp />
    </div>
  )
}

export default Paraphrase