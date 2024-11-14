import React, { useEffect } from 'react'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { GraphComp } from '../Components/GraphComp'

const Graph = () => {

    useEffect(()=>{
      document.title = "HiveMind"
    },[])

    const {id} = useParams();
  return (
    <div>
        <Header/>
        <GraphComp paperId = {id}/>
        
    </div>
  )
}

export default Graph