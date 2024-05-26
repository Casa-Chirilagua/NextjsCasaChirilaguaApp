'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
  const pathname = usePathname();
  const router = useRouter();
    useEffect(() => {
        if(pathname === '/'){
            router.push('/dashboard/student');
        }
    }, [pathname]);
  return (
    <div className='h-screen w-screen text-6xl flex items-center justify-center ]'><h1 className='text-zinc-600'>Home Page Comming soon...</h1></div>
  )
}

export default page