import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface Props {
    title: string;
    description:string;
    src:string;
}

const ArticleGameF = ({title, description, src}:Props) => {
    return (
        <article className='flex flex-col gap-2 w-[500px] mt-6 primary-text'>
            <picture className='w-full'>
                <Image className='w-full opacity-80 h-[220px] rounded-t-2xl' src={src} width={500} height={300} alt='picture' />
            </picture>
            <h1 className='font-bold text-xl'>{title}</h1>
            <p className='opacity-40 text-base w-[360px]'>{description}</p>
        </article>
    )
}

export default ArticleGameF