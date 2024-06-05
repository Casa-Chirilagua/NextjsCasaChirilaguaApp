import React from 'react'

const BarChartCardSkeleton = () => {
    return (
        <div style={{
            borderRadius: '20px', boxShadow: `rgba(0, 0, 0, 0.12) 0px 6px 16px`
        }} className='flex flex-col bg-white col-span-2 border-r-4 w-full  h-[40rem] items-center gap-10 p-6'>
            <span className='w-11/12 bg-gray-300 h-10 rounded-full animate-pulse'></span>
            <div className='rounded-full bg-gray-300 w-[20rem] h-[20rem] animate-pulse'></div>
            <div className='flex flex-col gap-2 w-9/12'>
                <span className='w-11/12 bg-gray-300 h-4 rounded-full animate-pulse'></span>
                <span className='w-11/12 bg-gray-300 h-4 rounded-full animate-pulse'></span>
            </div>
        </div>
    )
}

export default BarChartCardSkeleton