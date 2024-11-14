import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getInterests, addHistory } from '../Services/GlobalApi'
import { BookSquare } from 'iconsax-react'
import { useNavigate } from 'react-router-dom'

const TopReadsComp = () => {

    const navigate = useNavigate()

    const [interests, setInterests] = useState(["Biology", "Materials Science", "Medicine", "Business", "Art", "Physics", "Linguistics", "Computer Science", "Law", "Environmental Sciences", "Engineering", "Geology", "Psychology", "Chemistry", "Economics", "Mathematics" , "Agricultural and Food Sciences" , "Education" , "Political Science", "History", "Sociology", "Philosophy", "Geography"])

    const [paperDetails, setPaperDetails] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(Cookies.get("interests")){
            const temp = Cookies.get("interests").split(",")
            setInterests(temp)
        }
        console.log(interests)
        setLoading(true)
        getInterests(interests).then((response) =>{
            
            setPaperDetails(response.data)
            console.log(response.data)
        }).then(()=>{
            setLoading(false)
        })
    },[])

  return (
    <div className='flex flex-col font-poppins mt-[45px] mr-[350px] ml-[175px]'>
        <div className='top-1 left-1 ml-20 flex items-center gap-4 font-semibold '>
        <BookSquare
        size="36"
        color="#161B33"
        />
        <h1 className='text-[36px]'>Reads for you</h1>
        </div>
        <div className='w-full h-[500px] rounded-xl bg-slate-100 shadow-xl mx-[75px] mt-[5px] overflow-scroll no-scrollbar'>
            {
                loading ? <div className='flex flex-col gap-3 mt-[75px] px-10 animate-fade animate-once'>
                    <div className='skeleton bg-slate-300 w-full h-[75px] opacity-50'></div>
                    <div className='skeleton bg-slate-300 w-full h-[75px] opacity-50'></div>
                    <div className='skeleton bg-slate-300 w-full h-[75px] opacity-50'></div>
                    <div className='skeleton bg-slate-300 w-full h-[75px] opacity-50'></div>
                    
                </div> : <div className='flex flex-col gap-6 mt-[50px] px-10 animate-fade animate-once'>
                    {
                        paperDetails.map(paper =>{
                            return <div className='bg-slate-200 w-full h-fit p-6 rounded-lg shadow-md cursor-pointer group hover:bg-[#FFE066] transition-colors duration-150' onClick={()=>{
                                navigate('/paper/' + paper["_paperId"])
                                addHistory(Cookies.get("userId"), paper["_paperId"])
                            }}>
                                <h1 className='font-semibold group-hover:text-white transition-colors duration-150'>{paper["_title"]}</h1>
                                <h1 className='mt-3 text-sm text-slate-600 group-hover:text-white transition-colors duration-150'>{paper["_year"]}</h1>
                            </div>
                        })
                    }
                </div>
            }
        </div>
       
    </div>
  )
}

export default TopReadsComp