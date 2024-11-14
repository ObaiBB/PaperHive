import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { updateInterests, getUser } from '../Services/GlobalApi';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';


const interests = ["Biology", "Materials Science", "Medicine", "Business", "Art", "Physics", "Linguistics", "Computer Science", "Law", "Environmental Sciences", "Engineering", "Geology", "Psychology", "Chemistry", "Economics", "Mathematics" , "Agricultural and Food Sciences" , "Education" , "Political Science", "History", "Sociology", "Philosophy", "Geography"];

function InterestComp() { 

const navigate = useNavigate()

var [chosenInterests, setChosenInterests] = useState([])

const location = useLocation()
var userId = location.state.userId

const mUserID = Cookies.get("userId")

function toggleItem(item){
    if(chosenInterests.includes(item)){
       setChosenInterests(
        chosenInterests.filter(function(value){
            return value != item
        })
       )
    }else{
        setChosenInterests([
            ...chosenInterests, item
        ])
    }
    console.log(chosenInterests)

}

function resetItems(){
    setChosenInterests([]);
}

    var renderedInterests = interests.map((item, i) =><div className={`select-none cursor-pointer font-semibold text-[#161B33] font-poppins shadow-lg text-center  h-fit rounded-2xl p-4 ${item == "Geography" ? "col-span-2 w-72" : "col-span-1 w-fit"} transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#FFE066] hover:text-white duration-300 ${chosenInterests.includes(item) ? "bg-[#FFE066] text-white" : ""} `} onClick={()=>{
        toggleItem(item)
    }} > <h1>{item}</h1></div>)


  return (
    <div>
        <section className='select-none bg-gray-50 h-full mt-20 flex flex-col items-center justify-center'>
            <h1 className='font-semibold text-[#161B33] font-poppins text-[56px] animate-fade animate-once hover:text-[#6B7FFB] transition-colors duration-200 '>Choose your research interests</h1>
            {/* Interest Container */}
            <div className='bg-gray-100 mt-2 rounded-2xl shadow-lg w-fit mx-52 p-5 z-50'>
                
                <div className='sm:w-full px-10 grid grid-cols-6 gap-x-36 gap-y-3 grid-flow-dense justify-evenly items-center  place-items-center'>
                    {renderedInterests}
                </div>
                
                
            </div>
            <div className=' select-none mt-2 rounded-2xl p-0 z-50 grid grid-cols-4 h-full px-10 gap-7'>
                    <div className='bg-gray-100 mt-5 rounded-2xl shadow-lg p-5 z-50  opacity-50 transition-opacity hover:opacity-100 cursor-pointer'  onClick={()=>{
                            setChosenInterests([])
                            updateInterests(userId, [])
                            navigate('/', {
                                replace: true, state:{
                                    userId: userId
                                }
                            })
                            
                        }}>
                        <h1 className='font-semibold font-poppins cursor-pointer'>Skip for now</h1>
                    </div>
                    <div className={`col-span-3 bg-[#6B7FFB] mt-5 rounded-2xl shadow-lg p-5 z-50 justify-center items-center text-center  transition-opacity cursor-pointer ${chosenInterests.length == 0 ? "pointer-events-none opacity-70" : "opacity-100"} `}  onClick={()=>{
                            updateInterests(userId, chosenInterests)
                            if(!Cookies.get("userId")){
                                console.log("Hello mom")
                                navigate('/login', {
                                    replace:true
                                })
                            }else{
                                console.log("Hello mom")
                                navigate('/', {
                                    replace: true, state:{
                                        userId: userId
                                    }
                                })
                            }
                        }}>
                        <h1 className='text-white font-semibold font-poppins'>Submit</h1>
                    </div>

                    
                </div>
        </section>
    </div>
  )
}

export default InterestComp