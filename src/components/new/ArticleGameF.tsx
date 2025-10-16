import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface Props {
    title: string;
    description:string;
    src:StaticImageData;
}

const ArticleGameF = ({title, description, src}:Props) => {
    return (
        <article className='flex flex-col gap-2 w-[420px] mt-6 primary-text'>
            <picture className='w-full'>
                <Image className='w-full rounded-t-2xl' src={src} width={500} height={500} alt='picture' />
            </picture>
            <h1 className='font-bold text-xl'>{title}</h1>
            <p className='opacity-60 text-base w-[360px]'>{description}</p>
        </article>
    )
}

export default ArticleGameF