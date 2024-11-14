import React from 'react'

const Hive = () => {
  return (
    <div className='container opacity-40 ml-0 mb-4'>
            <div className='hex_HIGH pos0'></div>
            <div className='hex_LOW pos1'></div>
            <div className='hex_MED pos2' ></div>
            <div className={`hex_HIGH pos3 animate-spin` }></div>
            <div className='hex_HIGH pos4'></div>
            <div className='hex_LOW pos5' ></div>
            <div className='hex_MED pos6'></div>
            <div className='hex_MED small pos1a'></div>
            <div className='hex_MED small pos1b'></div>
            <div className='hex_MED small pos1c'></div>

        </div>
  )
}

export default Hive