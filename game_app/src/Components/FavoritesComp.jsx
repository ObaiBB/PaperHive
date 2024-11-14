import React, { useEffect, useState } from 'react'
import { Heart } from 'iconsax-react'
import { getFavorites, getPapers, removeFavorite } from '../Services/GlobalApi'
import { HeartSlash, Trash } from 'iconsax-react'
import { IoLockClosed } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import { Link } from 'react-router-dom';

const FavoritesComp = ({userId}) => {


    function handleDelete(e,paperId){
        e.stopPropagation();
        e.preventDefault();
        //Remove one from favorites
        const temp = favorites
        const newTemp = temp.filter(paper => {
            return paper != paperId
        })
        //console.log(newTemp)
        setFavorites(newTemp)
        //Update database using API
        removeFavorite(userId, paperId)
        //Update paperData by removing the paper using paperId
        const newPaperData = paperData.filter((paper)=>{
            return paper["_paperId"] != paperId
        })
       // console.log(newPaperData)
       setPaperData(newPaperData)
    }

    const [loading, setLoading] = useState(false)

    const [favorites, setFavorites] = useState([])
    const [results, setResults] = useState("")
    const [paperData, setPaperData] = useState([])

    useEffect(()=>{
        getFavorites(userId).then((response)=>{
            setLoading(true)
            console.log(response.data.favorites)
            if(response.data.favorites.length == 0){
                console.log("Here")
            }else{
                console.log("Here")
                getPapers(response.data.favorites).then((response) =>{
                    console.log(response)
                    setPaperData(response.data.results)
                    console.log(response.data.results)
                }).then(()=>{
                    setLoading(false)
                })

            }
            setFavorites(response.data.favorites)
        })

    },[])

  return (
    <div className='flex justify-center items-center font-poppins'>
        <div className='w-full mx-[250px] mt-[90px] h-[500px] bg-slate-100 rounded-xl shadow-xl'>
            <div className='mt-14 ml-14 flex items-center'>
            <Heart size={35} className='text-red-500 fill-red-500 mr-2'/>
            <h1 className='font-semibold text-[32px]'>My Favorites</h1>
            </div>
            {
                favorites.length == 0 ? <div className='mt-7 mx-10 h-[320px] bg-slate-200 rounded-2xl flex place-content-center'>

                <div className='flex flex-col gap-5 justify-center items-center'>
                        <HeartSlash
                        size="52"
                        color="#555555"
                        variant="TwoTone"
                        />
                    <h1 className='opacity-75'>It seems like you don't have anything here</h1>
                </div>
            </div> :
            
            loading ? <div className='flex justify-center items-center place-items-center mt-28'>

                <AiOutlineLoading className='text-[100px] animate-spin text-center'/>

            </div> : <div className='mt-7 mx-10 h-[320px] bg-slate-100 rounded-lg overflow-scroll py-3 no-scrollbar flex flex-col gap-6 font-poppins'>
            {
                paperData.map((paper, id) =>{
                    return  <Link to={'/paper/' + paper["_paperId"]}>
                        <div className='group hover:bg-[#FFE066] duration-200 w-full h-[120px] bg-slate-200 rounded-2xl shadow-md p-4 cursor-pointer relative'>
                        <h1 className='font-semibold group-hover:text-white duration-200 mr-10'>{paper["_title"]}</h1>
                        <div className='flex ml-2 flex-row gap-3 mt-2'>
                            <h1 className='text-sm opacity-80 mt-1'>{paper["_year"]}</h1>
                        {
                            paper["_openAccessPdf"] ? <div className='rounded-lg glass p-1 flex items-center'><IoLockOpenOutline className='mr-2'/><h1 className='font-poppins text-[14px]'>PDF Link available</h1></div> : <div className='rounded-lg glass p-1 flex items-center'><IoLockClosed className='mr-2'/> <h1 className='font-poppins text-[14px]'>PDF Link unavailable</h1></div>
                        }

                        </div>

                        <Trash
                        size="26"
                        className='absolute right-1 top-1 text-[#161B33] hover:text-white transition-colors duration-150 m-3 z-50'
                        onClick={(e)=>{
                            handleDelete(e, paper["_paperId"])
                        }}/>


                    </div>
                        </Link>
                  
                })
            }
        </div>
            }
            
        </div>
    </div>
  )
}

export default FavoritesComp