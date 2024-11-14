import React, { useEffect } from 'react'
import Header from '../Components/Header'
import FavoritesComp from '../Components/FavoritesComp'

import { useParams } from 'react-router-dom'

const Favorites = () => {

  useEffect(()=>{
    document.title = "PaperHive"
  },[])

    const {id} = useParams()
    console.log(id)

  return (

    <div>
        <Header/>
        <FavoritesComp userId={id} />
    </div>
  )
}

export default Favorites