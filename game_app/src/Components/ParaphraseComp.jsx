import React, { useState } from 'react'
import { MagicStar, QuoteUp, Trash, Copy } from 'iconsax-react'
import { paraphrase, getParaphrase } from '../Services/GlobalApi';
import { ToastContainer, toast } from 'react-toastify';

const ParaphraseComp = () => {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)

    const [counter, setCounter] = useState(0)

    const [inputText, setInputText] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [placeholder, setPlaceholder] = useState("Why don't scientists trust atoms? Because they make up everything!");

    const [suggestions, setSuggestions] = useState([])

    const notify = () => toast.success("Copied to clipboard", {
        position: "top-center",
        theme: "colored",
        limit: 1
    })

    function handleSubmit(){
        if(inputValue.length == 0){
            setPlaceholder("How about you try me out instead of writing nothing huh?")
        }else{
            setSuccess(false)
            console.log(inputText);
            console.log(inputValue)
            setLoading(true)
            getParaphrase(inputValue).then((response) =>{
                console.log(response.data.suggestions)
                setSuggestions(response.data.suggestions)
            }).then(()=>{
                setLoading(false)
                setSuccess(true)
            })
        }
    }

    function handleSample(){
        setInputValue("PaperHive is an Innovative Research Tool designed to meet your academic and professional endeavours!")
    }

  return (
    <div className='flex justify-center items-center relative font-poppins'>
        <ToastContainer />
        <div className='w-full relative mt-16 mx-[100px] h-[525px] bg-slate-200 shadow-lg rounded-lg flex flex-row justify-center items-center '>
            
            
            
            
            {/* Input Text */}
            <form className={`w-full h-full relative ${success ? "focus:outline-none" : ""}`}>
            <div className='w-full h-full '>
                <textarea type="text" maxLength={300} className='h-full w-full bg-slate-200 pb-[150px] p-7 pr-16 resize-none rounded-lg' placeholder={placeholder} onChange={(e)=>{
                    setInputText(e.target.value)
                    setInputValue(e.target.value)
                    setCounter(e.target.value.length)
                }} value={inputValue} />
                <h1 className='text-sm absolute bottom-1 left-1 m-9 opacity-50 select-none'>{counter}/300</h1>
                
            </div>
            {/* Delete Button */}
            <div className=''>
                <Trash size={32} className='text-[#161B33] hover:text-red-400 transition-colors duration-150 absolute top-1 right-1 m-4 cursor-pointer' onClick={()=>{
                    setInputText("")
                    setInputValue("")
                    setCounter(0);
                }}/>
            </div>
            <div  className='absolute bottom-1 m-7 ml-[400px] z-30 btn btn-primary w-[200px]' onClick={()=>{
                handleSubmit();
            }}>
                
                <h1 className='font-semibold font-poppins flex items-center gap-3 text-white'>Do the magic
                <MagicStar
                    size="22"
                    color="#FFE066"
                    variant='bold'
                    />
                </h1>
            </div>

            <div  className='absolute bottom-1 m-7 ml-[235px] z-30 btn btn-outline bg-slate-100 hover:bg-slate-100  group-hover:outline-black group w-fit' onClick={()=>{
                handleSample();
            }}>
                
                <h1 className=' font-poppins flex items-center gap-3 text-black transition-colors duration-150'>Sample text
                <QuoteUp
                    size="22"
                    className='text-[#161B33] group-hover:text-[#6B7FD7] fill-white transition-colors duration-150'
                    variant="Bold"
                    fill='#161B33'
                    />
                </h1>
            </div>
                    </form>
            {/* Paraphrased Text */}
            <div className={`w-full rounded-lg h-full bg-slate-100 outline p-7 flex flex-col gap-5 transition-colors duration-200 ${success ? "outline-[#6B7FD7]" : "outline-slate-400"} relative`}>
            
            {
                loading ? <div className='flex flex-col gap-5'>

                <div className="skeleton w-full h-20 bg-slate-200"></div>
                <div className="skeleton w-full h-20 bg-slate-200"></div>
                <div className="skeleton w-full h-20 bg-slate-200"></div>
                <div className="skeleton w-full h-20 bg-slate-200"></div>
                <div className="skeleton w-full h-20 bg-slate-200"></div>
            </div> :
             <div className='overflow-scroll font-poppins pr-10'>
                {
                    suggestions.map((suggestion) =>{
                        return <div className='relative w-full h-[115px] p-4 pr-20 my-4 shadow-md glass rounded-xl overflow-scroll no-scrollbar '>
                            {suggestion["text"]}

                            <Copy id='my-copy' name='my-copy' className='text-[#161B33] cursor-pointer absolute right-1 top-1 m-3' size={24} onClick={()=>{
                                navigator.clipboard.writeText(suggestion["text"])
                                notify();
                            }} />


                        </div>
                    })
                }
             </div>
            }
            
            
            
            </div>
        </div>
    </div>
  )
}

export default ParaphraseComp