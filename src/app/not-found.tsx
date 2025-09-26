import React from 'react'
import notFound from '../assets/images/404.png'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className='flex items-center justify-center'>
        <Image width={500} height={500} src={ notFound.src} alt='Not Found'/>
    </div>
  )
}
