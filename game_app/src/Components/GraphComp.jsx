import React, { useEffect, useState } from 'react'
import { getGraph } from '../Services/GlobalApi';
import Hive from './Hive';
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


import {
    HexGrid,
    Layout,
    Hexagon,
    Text,
    Pattern,
    Path,
    Hex
  } from "react-hexgrid";

  function handleCitations(paperData, key){
    var citationCount = ""
    paperData.map((paper)=>{
        //console.log(key)
        //console.log(paper["_title"])
        if(paper["_paperId"] == key){

            citationCount = paper["_citationCount"].toString()
        }
    
    })
    return citationCount;
    
  }

  function handleColor(paperData, key){
    var color = ""
    paperData.map((paper)=>{
        if(paper["_paperId"] == key){
            if(paper["_citationCount"] >= 20){
                color = "fill-HEX-HIGH"
                //color = "#161B33"
            }else if(paper["_citationCount"] >= 10 && paper["_citationCount"] < 20){
                color = "fill-HEX-MID"
                //color = "#6B7FD7"
            }else{
                color = "fill-HEX-LOW"
                //color = "#FFE066"
            }
        }
    })
    return color
  }

export const GraphComp = ({paperId}) => {

    const navigate = useNavigate();
    const [graphData ,setGraphData] = useState([]);
    const [L1Keys, setL1Keys] = useState([])

    const [paperData, setPaperData] = useState([])

    const [testData, setTestData] = useState("")

    const [loading, setLoading] = useState(false)

    const [selectedPaper, setSelectedPaper] = useState("");

    const [paperDetails, setPaperDetails] = useState("");
    const [paperDetailsToggle, setPaperDetailsToggle] = useState(false);

    function handlePaperDetails(key){
        paperData.map((paper)=>{
            if(paper["_paperId"] == key){
                setPaperDetailsToggle(true)
                setPaperDetails(paper)
            }
        })
        return;
    }

    function handlePaperNavigation(e, key){
        navigate('/paper/' + key)
        e.stopPropagation();
    }

    function unHandlePaperDetails(){
        setPaperDetails("")
        setPaperDetailsToggle(false)
    }


    useEffect(()=>{
        console.log(loading)
        setLoading(true)
        console.log(loading)
        getGraph(paperId).then((response)=>{  
            
            //console.log(response.data.results)
            return response

        }).then((response)=>{

            //console.log(response.data.results)
            setL1Keys(Object.keys(response.data.results))
            setGraphData(response.data.results)
            return response

        }).then((response) => {
            //console.log(graphData)
            setPaperData(response.data.paperIds)
            setTestData(response.data.paperIds[0])
            console.log(loading)
            setSelectedPaper(response.data.paperIds[0])

            return;
        }).then(()=>{
            setLoading(false)
        }).catch(err => console.log(err))
    },[])

  return (
    <div className={`m-6 h-[625px] bg-slate-100 rounded-2xl shadow-2xl ${loading ? "grid place-content-center" : ""} `}>
        {
            loading ? <div className='flex flex-col font-poppins text-2xl font-semibold justify-center gap-5 items-center'>
                <h1 className=''>BUILDING YOUR HIVE</h1>
                <AiOutlineLoading className='animate-spin text-[60px]'/>
            </div>


             :

             

             <div className='px-16 py-16 gap-20 flex h-full transition-all animate-fade animate-delay-300 animate-duration-300'>
                
            <div className=' h-full rounded-xl  w-2/3 flex justify-center items-center'>
                <div className='flex flex-col w-32 gap-2 justify-center font-poppins'>
                    <div className='w-fit font-semibold'>
                        <h1># of citations</h1>
                    </div>
                    
                    <div className='flex gap-4 items-center'>
                        <div className='w-[15px] h-[15px] bg-[#161B33]'></div>
                        <h1>High</h1>
                    </div>
                    
                    <div className='flex gap-4 items-center'>
                        <div className='w-[15px] h-[15px] bg-[#6B7FD7]'></div>
                        <h1>Medium</h1>
                    </div>
                    
                    <div className='flex gap-4 items-center'>
                        <div className='w-[15px] h-[15px] bg-[#FFE066]'></div>
                        <h1>Low</h1>
                    </div>
                </div>
                
                <HexGrid>
                    <Layout size={{x: 10, y:10}}
                            flat={true}
                            spacing={1.1}
                            origin={{x: 0, y:0}}
                            
                    >
                        {/* MIDDLE HEXAGON */}
                        <Hexagon  q={0} r={0} s={0} className={`hover:scale-110 duration-300 fill-HEX-HIGH scale-150`}  onMouseEnter={()=>{
                                handlePaperDetails(selectedPaper["_paperId"])
                            }} onMouseLeave={()=>{
                                unHandlePaperDetails()
                            }}  >
                            {selectedPaper ? <Text className='' fontFamily='poppins' fontSize={2} fill='#FFFFFF' >{selectedPaper["_citationCount"]}</Text> : "ERROR"} 
                        </Hexagon>
                        
                        <Layout size={{x:9.5, y:9.5}}
                                flat={true}
                                spacing={1.5}    
                                    >

                        
                        {/* TOP RIGHT */}

                        {
                            
                            L1Keys.map((key, id)=>{
                            
                                if(id>0 && id < 7){
                                    switch (id) {
                                        case 1:
                                            {
                                                paperData.map((paper, id)=>{
                                                    if(paper["_paperId"] == key){
                                                        //console.log(paper["_paperId"])
                                                        //setHexa1(paper)
                                                    }
                                                })
                                            }
                                            return <Hexagon q={1} r={-1} s={0} className={`${handleColor(paperData, key)} cursor-pointer`} onMouseEnter={()=>{handlePaperDetails(key)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                handlePaperNavigation(e,key)
                                            }}>
                                                    <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, key)}</Text>
                                                    <Layout  size={{x:6.5, y:6.5}} flat={true} spacing={1.6} className='origin-center'>
                                                    {
                                                        graphData[key].map((paperId,id)=>{
                                                            switch (id){
                                                                case 0:
                                                                    return <Hexagon q={0.4} r={-1.1} s={-1} className={`cursor-pointer ${handleColor(paperData, paperId)} duration-150`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                        handlePaperNavigation(e,paperId)
                                                                    }} >
                                                                        <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                    </Hexagon>
                                                             
                                                                case 1:
                                                                    return <Hexagon q={1} r={-0.8} s={0} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                        handlePaperNavigation(e,paperId)
                                                                    }} >
                                                                        <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                    </Hexagon>
                                                                
                                                                case 2:
                                                                    return <Hexagon q={1} r={0} s={-1} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                        handlePaperNavigation(e,paperId)
                                                                    }} >
                                                                        <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                    </Hexagon>
                                                                  
                                                                default:
                                                                    return;
                                                            }
                                                        } )
                                                    }
                                                

                                                     </Layout>

                                            </Hexagon>
                                            
                                        case 2:
                                            // BOTTOM LEFT
                                            {
                                                paperData.map((paper, id)=>{
                                                    if(paper["_paperId"] == key){
                                                        //console.log(paper["_paperId"])
                                                        //setHexa4(paper)
                                                    }
                                                })
                                            }
                                            return <Hexagon q={-1} r={1} s={0} className={`w-50 h-50 cursor-pointer ${handleColor(paperData, key)}`} onMouseEnter={()=>{handlePaperDetails(key)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                handlePaperNavigation(e,key)
                                            }}>
                                                <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, key)}</Text>
                                                <Layout  size={{x:6.5, y:6.5}} flat={true} spacing={1.6} className='origin-center'>
                                                    {
                                                        graphData[key].map((paperId, id)=>{
                                                            switch(id){
                                                                case 0:
                                                                    return <Hexagon q={-1.05} r={0.2} s={1} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                        handlePaperNavigation(e,paperId)
                                                                    }} >
                                                                        <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                    </Hexagon>
                                                                    return;
                                                                case 1:
                                                                    return <Hexagon q={-0.9} r={0.9} s={0} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                        handlePaperNavigation(e,paperId)
                                                                    }} >
                                                                        <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                    </Hexagon>
                                                                    return;
                                                                case 2:
                                                                    return <Hexagon q={-0.15} r={0.95} s={-1} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                        handlePaperNavigation(e,paperId)
                                                                    }} >
                                                                        <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                    </Hexagon>
                                                                    return;
                                                                default:
                                                                    return;
                                                            }
                                                        })
                                                    }

                                                </Layout>
                                             </Hexagon>
                                        case 3:
                                            //TOP LEFT
                                            {
                                                paperData.map((paper, id)=>{
                                                    if(paper["_paperId"] == key){
                                                        //console.log(paper["_paperId"])
                                                        //setHexa5(paper)
                                                    }
                                                })
                                            }
                                            return <Hexagon q={-1} r={0} s={1} className={`cursor-pointer ${handleColor(paperData, key)}`} onMouseEnter={()=>{handlePaperDetails(key)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                handlePaperNavigation(e,key)
                                            }}>
                        
                                                <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, key)}</Text>
                                                 <Layout size={{x:6.5, y:6.5}} flat={true} spacing={1.6} origin={{x:0, y:0}}>
                                                    {
                                                        graphData[key].map((paperId, id)=>{
                                                            switch (id){
                                                                case 0:
                                                                    return <Hexagon q={-1} r={0} s={1} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                        handlePaperNavigation(e,paperId)
                                                                    }} >
                                                                        <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                    </Hexagon>
                                                                case 1:
                                                                    return <Hexagon q={-0.2} r={-0.8} s={-1} className={` cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                        handlePaperNavigation(e,paperId)
                                                                    }} >
                                                                        <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                    </Hexagon>
                                                                case 2:
                                                                    return <Hexagon q={-1.15} r={0.85} s={1} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                        handlePaperNavigation(e,paperId)
                                                                    }} >
                                                                        <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                    </Hexagon>
                                                                default:
                                                                    return
                                                            }
                                                        })
                                                    }

                                                     </Layout>
                                            </Hexagon>

                                        case 4:
                                            {
                                                //BOTTOM RIGHT
                                                paperData.map((paper, id)=>{
                                                    if(paper["_paperId"] == key){
                                                        //console.log(paper["_paperId"])
                                                        //setHexa2(paper)
                                                    }
                                                })
                                            }
                                            //BOTTOM RIGHT
                                            return <Hexagon q={1} r={0} s={-1} className={`cursor-pointer ${handleColor(paperData, key)}`} onMouseEnter={()=>{handlePaperDetails(key)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                handlePaperNavigation(e,key)
                                            }}>
                                                    <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, key)}</Text>
                                                    <Layout size={{x:6.5, y:6.5}} flat={true} spacing={1.6} className='origin-center'>
                                                        {
                                                            graphData[key].map((paperId, id)=>{
                                                                switch (id){
                                                                    case 0:
                                                                        return <Hexagon q={1.1} r={-0.6} s={0} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                            handlePaperNavigation(e,paperId)
                                                                        }} >
                                                                            <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                        </Hexagon>
                                                                    case 1:
                                                                        return <Hexagon q={1} r={0.2} s={-1} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                            handlePaperNavigation(e,paperId)
                                                                        }} >
                                                                            <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                        </Hexagon>
                                                                    case 2:
                                                                        return  <Hexagon q={0.2} r={0.9} s={-1} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                            handlePaperNavigation(e,paperId)
                                                                        }} >
                                                                            <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                        </Hexagon>
                                                                    default:
                                                                        return;

                                                                }
                                                            })
                                                        }
               
                                                    </Layout>
                                                </Hexagon>
                                            break;
                                        case 5:
                                            //TOP
                                            {
                                                paperData.map((paper, id)=>{
                                                    if(paper["_paperId"] == key){
                                                        //console.log(paper["_paperId"])
                                                        //setHexa6(paper)
                                                    }
                                                })
                                            }
                                            return <Hexagon q={0} r={-1} s={1} className={`cursor-pointer ${handleColor(paperData, key)}`} onMouseEnter={()=>{handlePaperDetails(key)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                handlePaperNavigation(e,key)
                                            }}>
                                                <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, key)}</Text>
                                            <Layout size={{x:6.5, y:6.5}} flat={true} spacing={1.6} className='origin-center'>
                                                {
                                                    graphData[key].map((paperId, id)=>{
                                                        switch (id){
                                                            case 0:
                                                                return <Hexagon q={-0.85} r={-0.2} s={1} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                    handlePaperNavigation(e,paperId)
                                                                }} >
                                                                    <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                </Hexagon>
                                                            case 1:
                                                                return <Hexagon q={0} r={-1} s={-1} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                    handlePaperNavigation(e,paperId)
                                                                }} >
                                                                    <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                </Hexagon>
                                                            case 2:
                                                                return <Hexagon q={0.9} r={-1.1} s={0} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                    handlePaperNavigation(e,paperId)
                                                                }} >
                                                                    <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                </Hexagon>
                                                            default:
                                                                return;
                                                        }
                                                    })
                                                }
                
                                                

                                            </Layout>
                                        </Hexagon>
                                        //BOTTOM
                                        case 6:
                                            {
                                                paperData.map((paper, id)=>{
                                                    if(paper["_paperId"] == key){
                                                        //console.log(paper["_paperId"])
                                                        //setHexa3(paper)
                                                    }
                                                },[])
                                            }
                                            return <Hexagon q={0} r={1} s={-1} className={`cursor-pointer hover:outline-8 hover:outline-black ${handleColor(paperData, key)}`} onMouseEnter={()=>{handlePaperDetails(key)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                handlePaperNavigation(e, key)
                                            }} >
                                                <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, key)}</Text>
                                            <Layout size={{x:6.5, y:6.5}} flat={true} spacing={1.6} className='origin-center'>

                                                {
                                                    graphData[key].map((paperId, id)=>{
                                                        switch (id){
                                                            case 0:
                                                                return <Hexagon q={0.8} r={0.2} s={-1} className={`cursor-pointer z-40 shadow-xl ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                    handlePaperNavigation(e, paperId)
                                                                }} >
                                                                    <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                </Hexagon>
                                                            case 1:
                                                                return <Hexagon q={0} r={0.9} s={-1} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                    handlePaperNavigation(e, paperId)
                                                                }} >
                                                                    <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                </Hexagon>
                                                            case 2:
                                                                return <Hexagon q={-0.8} r={1} s={0} className={`cursor-pointer ${handleColor(paperData, paperId)}`} onMouseEnter={()=>{handlePaperDetails(paperId)}} onMouseLeave={()=>unHandlePaperDetails()} onClick={(e)=>{
                                                                    handlePaperNavigation(e, paperId)
                                                                }} >
                                                                    <Text fill='#FFFFFF' fontFamily='poppins' fontSize={3}>{handleCitations(paperData, paperId)}</Text>
                                                                </Hexagon>
                                                        }
                                                    })
                                                }

                                             </Layout>


                                     </Hexagon>
                                        default:
                                            return;
                                    }
                                }
                            })
                        }
                        
                        </Layout>


                    </Layout>
                </HexGrid>
            </div>
            <div className='bg-slate-400 bg-opacity-70 rounded-xl h-full shadow-xl w-full justify-center'>
                <div>
                      <h1 className='mt-8 font-poppins font-semibold text-white text-[26px] text-center'>Paper Details</h1>
                        
                </div>

                {/* This is where we should write the paper details */}

                {
                    paperDetailsToggle ? <div className=''>
                    <div className='mt-5 ml-5 mr-7 pr-4 w-full text-white font-poppins break-word'>
                            <h1>{paperDetails["_title"]}</h1>
                        </div>
                        <div className='mt-2 ml-5 w-full text-white font-poppins font-bold'>
                            <h1>{paperDetails["_year"]}</h1>
                        </div>
                        <div className='grid grid-cols-2 grid-rows-4 mt-2 w-fit mr-5 auto-rows-max'>
                        {
                            paperDetails["_authors"].map((author, id)=>{
                                if(id <=4){
                                    return <div className='w-fit h-fit text-[14px] bg-white rounded-xl p-3 mt-2 ml-4 shadow-md text-center'> {author["name"]} </div>
                                }
                                if(id == 7){
                                    return <h1 className='text-white font-poppins font-bold text-center items-center mt-5 justify-center'>and more...</h1>
                                }
                            })
                        }
                        </div>
                        
                </div>
                    
                    :
                    
                    ""
                }

                
                
                        
  
            </div>
            <div>
                
            </div>

            

    </div>
        }
        
    </div>
  )
}
