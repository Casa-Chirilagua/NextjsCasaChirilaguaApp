import React from 'react'
import NumberCardSkeleton from  '@/components/skeletons/NumberCardSkeleton'
import BarChartCardSkeleton from '@/components/skeletons/BarChartCardSkeleton'

const loading = () => {
  return (
    <div className='dash-container'>
      <div className=" flex flex-col col-span-4 bg-gray-300 h-10 rounded animate-pulse">
      </div>
      <NumberCardSkeleton />
      <NumberCardSkeleton />
      <NumberCardSkeleton />
      <BarChartCardSkeleton />
    </div>);
}

export default loading