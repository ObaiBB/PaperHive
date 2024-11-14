import React, { useEffect } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import PaperComp from '../Components/PaperComp'
import Header from '../Components/Header'

export const Paper = () => {

    useEffect(()=>{
      document.title = "PaperHive"
    },[])

    const {id} = useParams()

  return (
    <div>
        <Header/>
        <PaperComp paperId={id} />
        {/* Recommended Papers */}
    </div>
  )
}
