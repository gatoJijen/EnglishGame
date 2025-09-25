import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

interface CartProps {
  title?: string;
  url: string;
}

const GameCart: React.FC<CartProps> = ({title, url}) => {
  return (
    <article className='w-[400px] flex justify-center items-center bg-white rounded-2xl h-[200px] '>
        <Link className='w-full h-full' href={url}>
            <Image className='w-full h-full rounded-2xl' src="/cartTest.webp" alt='test' width={400} height={200}/>
        </Link>
    </article>
  )
}

export default GameCart