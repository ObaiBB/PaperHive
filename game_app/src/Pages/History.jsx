import React, { useEffect } from 'react'
import Header from '../Components/Header'
import HistoryComp from '../Components/HistoryComp'
import { useParams } from 'react-router-dom'

const History = () => {

    useEffect(()=>{
      document.title = "History"
    },[])

    const {id} = useParams()
  return (
    <div>
        <Header />
        <HistoryComp userId={id}/>
    </div>
  )
}

export default History