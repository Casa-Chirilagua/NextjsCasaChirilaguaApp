'use client'

import { useParams } from "next/navigation"

const page = () => {
  const {id} = useParams();
  
  return (
    <div>{id}</div>
  )
}

export default page