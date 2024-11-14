import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const paperSkeleton = () => {
  return (
    <div>
        {/* Title */}
        <div className='w-full rounded-full bg-slate-400'>
            <Skeleton />
        </div>
        {/* authors */}
        {/* abstract */}

    </div>
  )
}

export default paperSkeleton