import React, { useEffect } from 'react'
import Header from '../Components/Header'
import LoginComp from '../Components/LoginComp'
import backgroundTest from '../assets/images/backgroundTest.png';

function Login() {
  useEffect(()=>{
    document.title = "Login"
  },[])
  return (
    <div >
        <Header/>
        <LoginComp/>
    </div>
  )
}

export default Login