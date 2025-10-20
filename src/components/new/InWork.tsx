import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const InWork = () => {
    return (
        <div className='flex flex-col gap-8 primary-text justify-center items-center h-[80dvh] mt-4'>
            <picture>
                <Image src={'/inwork.png'} alt='InWork' width={300} height={300} />
            </picture>
            <article className='text-center primary-text gap-3 flex flex-col'>
                <h1 className='font-bold text-4xl'>We are working on it!</h1>
                <p className='w-[500px]'>Our brainiac is working flat out to bring new and exciting questions to this section! Come back soon so you don&apos;t miss anything.</p>
            </article>
            <footer>
                <Link href={'/dashboard'}>
                    <button className='bg-blue-700 w-[240px] h-12 rounded-lg font-bold cursor-pointer'>
                        Return to the main page
                    </button>
                </Link>
            </footer>
        </div>
    )
}

export default InWork