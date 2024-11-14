import React, { useEffect, useState } from 'react'
import { getPaper, getRecommendations } from '../Services/GlobalApi'
import { AiOutlineLoading } from "react-icons/ai";
import { IoLockClosed } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Heart } from 'iconsax-react';
import { addFavorite, getFavorites, removeFavorite, addHistory } from '../Services/GlobalApi';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const PaperComp = ({paperId}) => {

  const [favoriteToggle, setFavoriteToggle] = useState(false)
  const [recommendations, setRecommendations] = useState([])

  const [recommendLoading, setRecommendLoading] = useState(false)

  function checkToggle(paperId){
    
    if(Cookies.get("userId")){
      getFavorites(Cookies.get("userId")).then(response =>{
        console.log(response.data.favorites)
        const favoritesList = response.data.favorites
        let toggle = false;
        favoritesList.map(item =>{
          if(item == paperId){
            toggle = true
            setFavoriteToggle(true)
          }
        })
        console.log(toggle)
        return toggle
      })
    }else{
      
    }
   
  }

  function handleFavorite(userId, paperId){
    console.log(paperId)
    if(favoriteToggle){
      removeFavorite(userId, paperId)
      setFavoriteToggle(false)
    }else{
      addFavorite(userId, paperId)
      setFavoriteToggle(true)
    }
    
  }

  function handleRecommendations(title){
      //setRecommendLoading(true)
      console.log(title)
      getRecommendations(title).then(response =>{

          console.log(response.data)
          setRecommendations(response.data)
      }).then(()=>{
        setRecommendLoading(false)
      })
  }

  const [paperData, setPaperData] = useState("");

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    checkToggle(paperId)
    console.log(favoriteToggle)
    setLoading(true)
    setRecommendLoading(true)
    getPaper(paperId).then((response)=>{
      setPaperData(response.data.results)
      setLoading(false)
      console.log(response.data.results)
      console.log(response.data.results["_title"])
      //console.log(paperData)
      return response
    }).then((response)=>{
      handleRecommendations(response.data.results["_title"])
    })
  },[])

  // useEffect(()=>{
  //   console.log(paperData)
  // }, [paperData])

  return (
    <div className='md:flex h-[650px]'>


      {/* Paper Details */}
      <div className={`bg-slate-200 rounded-xl w-2/3 shadow-xl p-5 m-5 ${loading ? "flex justify-center items-center place-items-center" : ""}`}>

        {
          loading ?
          // Loading
          <div className=''>
            <AiOutlineLoading className='text-[100px] animate-spin text-center'/>
          </div> : 
          //Otherwise
          <div className='relative left-0 bottom-0'>

            {
              Cookies.get("userId") ? <Heart className={`cursor-pointer transition duration-200 ease-in-out text-red-500 hover:fill-red-500 transform hover:-translate-y-1 hover:scale-110 absolute right-1 top-1 animate-delay-100 z-30 ${favoriteToggle? "fill-red-500" : ""} `} onClick={()=>{
                handleFavorite(Cookies.get("userId"), paperId)
              }} /> : ""
            }
            
            
            

          <h1 className='font-poppins font-bold text-[36px] mr-9 animate-fade-right animate-delay-50'>{paperData["_title"]}</h1>
          <h1 className='animate-fade-right animate-delay-100'>{paperData["_year"]}</h1>
          
          {
            paperData["_abstract"] ? <h1 className='mt-6 font-poppins text-md font-semibold animate-fade-right animate-delay-200 h-[190px] overflow-y-scroll px-3'>{paperData["_abstract"]}</h1> : ""
          }
          

          {
            paperData["_openAccessPdf"] ?
            <a href={paperData["_openAccessPdf"]["url"]} target="_blank" rel="noopener noreferrer" className='cursor-default'>
            <div className='flex items-center mb-3 glass w-fit cursor-pointer  rounded-xl px-3 animate-fade-right animate-delay-[250ms] mt-2'>
            <IoLockOpenOutline className=''/>
            <h1 className='ml-2'>PDF link available</h1>
            </div> 
            </a> 
            :<a href={paperData["_url"]} target='_blank' rel='noopener noreferrer' className='cursor-default'> 
            <div className='flex items-center mb-3 glass w-fit rounded-xl px-3 animate-fade-right cursor-pointer animate-delay-[250ms] mt-2'>
              
            <IoLockClosed/>
            <h1 className='ml-2'>PDF link un-available</h1>
            </div>
            </a>
          }
          
          <div className='flex flex-row flex-wrap animate-fade-right animate-delay-[350ms]'>

          {paperData["_authors"]?.map((author)=>
          <div className='w-fit h-fit text-[16px] bg-white rounded-xl p-3 mr-3 mt-2 shadow-md text-center'>
            {author["name"]}
          </div>
          )}
          </div>
          
          </div>
          

        }
        

      </div>
      {/* Right Container */}
      <div className='bg-[#161B33] bg-opacity-100 rounded-xl w-1/3 p-5 m-5 justify-between shadow-xl '>
        <div className=' rounded-lg h-[500px] p-5 text-center'>
            <h1 className='font-poppins font-semibold text-2xl text-white'>Recommended Papers</h1>
            <div className='w-full mt-4 h-[400px] overflow-scroll no-scrollbar animate-fade animate-once'>
              {
                recommendLoading ? <div className='flex flex-col gap-3 mt-5'>
                    <div className='skeleton bg-slate-200 w-full h-[75px] opacity-20'></div>
                    <div className='skeleton bg-slate-200 w-full h-[75px] opacity-20'></div>
                    <div className='skeleton bg-slate-200 w-full h-[75px] opacity-20'></div>
                    <div className='skeleton bg-slate-200 w-full h-[75px] opacity-20'></div>
                </div> : <div className='flex flex-col gap-4 animate-fade animate-once'>
                  {
                    recommendations.map((paper) =>{
                      return  <div className='bg-slate-200 shadow-2xl rounded-xl w-full h-fit p-4 font-poppins cursor-pointer group hover:bg-[#FFE066] transition-colors duration-150' onClick={()=>{
                        navigate('/paper/' + paper["_paperId"], {replace: false,})
                        if(Cookies.get("userId")){
                          addHistory(Cookies.get("userId"), paper["_paperId"])
                        }
                        navigate(0)
                      }}>
                                  <h1 className='font-semibold text-lg text-left mt-2 group-hover:text-white transition-colors duration-150'>{paper["_title"]}</h1>
                                  <h1 className='font-semibold text-sm text-slate-700 text-left mt-2 group-hover:text-white transition-colors duration-150'>{paper["_year"]}</h1>
                              </div>


                    })
                  }
                </div>
              }
            </div>
        </div>
        
        {/* Recommended Papers List */}
        <div className={`w-full mt-3 p-5 rounded-lg text-center bg-[#FFE066] text-black select-none ${loading ? " opacity-60 cursor-not-allowed pointer-events-none": "cursor-pointer transition ease-in-out hover:-translate-y-2 hover: scale-105 duration-200 hover:text-white"} `} onClick={()=>{
          navigate('/graph/' + paperData["_paperId"])
        }}>
            

            <h1 className='font-poppins font-semibold'>Build a graph</h1>
            
        </div>
      </div>
    </div>
  )
}

export default PaperComp