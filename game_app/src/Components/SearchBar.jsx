import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5"
import { searchPapers } from '../Services/GlobalApi'
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';



const SearchBar = () => {

    const navigate = useNavigate()

    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    var object = ""

    const handleChange = (value)=>{
      setInput(value)
    }

    function handleSubmit(event){
      setLoading(true)
      console.log(loading)
      event.preventDefault();
      searchPapers((input).trim()).then((response)=>{
        console.log(response.data.results)
        if(response.status == 200){
          object = response.data.results
          navigate('/results?query=' + input, {state: object})
        }else{

        }
      }).then(()=>{
        setLoading(false)
      }).catch(()=>{
        setLoading(false)
      })
    }

  return (
    <div className='pt-5 py-8 flex justify-center items-center'>
        <div className='flex items-center   bg-slate-100 p-2 w-[750px] center mx-1 rounded-full bg-center z-40 shadow-xl'>
                <form action="" className='flex ml-3 w-full' onSubmit={handleSubmit}>
                  <button className='mt-1' type='submit'>
                <IoSearchSharp className=''/>
                  </button>
                
                <input className=' font-poppins bg-transparent outline-none px-4 w-full' type="text" placeholder='Search for Papers' value={input} onChange={(e)=>{
                    handleChange(e.target.value)
                }} onSubmit={()=>{
                  setLoading(true)
                }}/>
                {
                  loading ? <AiOutlineLoading className='text-[26px]  animate-spin mr-5'/> : ""
                }
                </form>
        </div>
        </div>
  )
}

export default SearchBar