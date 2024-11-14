import React, { useEffect } from 'react'
import Header from '../Components/Header'
import RegisterComp from '../Components/RegisterComp'

function Register() {
  useEffect(()=>{
    document.title = "Register"
  },[])
  return (
    <div>
        <Header/>
        <RegisterComp/>
    </div>
  )
}

export default Register