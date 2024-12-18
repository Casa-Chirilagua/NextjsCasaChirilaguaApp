import React from 'react'

const NumberCardSkeleton = () => {
    return (
        <div style={{
            borderRadius: '20px', boxShadow: `rgba(0, 0, 0, 0.12) 0px 6px 16px`
        }} className='flex flex-col bg-white  border-r-4 w-full  h-full items-center gap-10 p-6'>
            <span className='w-11/12 bg-gray-300 h-10 rounded-full animate-pulse'></span>
            <div className='rounded bg-gray-300 w-[8rem] h-[9rem] animate-pulse'></div>
            <div className='flex flex-col gap-2 w-9/12'>
                <span className='w-11/12 bg-gray-300 h-4 rounded-full animate-pulse'></span>
                <span className='w-11/12 bg-gray-300 h-4 rounded-full animate-pulse'></span>
            </div>
        </div>
    )
}

export default NumberCardSkeleton