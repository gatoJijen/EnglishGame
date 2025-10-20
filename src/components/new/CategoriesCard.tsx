import Image from 'next/image'
import React from 'react'

interface Props {
    title: string ;
    description: string;
    url: string;
}

const CategoriesCard = ({ title, description, url}: Props) => {
    return (
        <article>
            <picture>
                <Image className='rounded-xl' src={url} alt={title} width={220} height={220} />
            </picture>
            <h1 className='font-bold text-xl'>
                {title}
            </h1>
            <p className='opacity-40 text-sm w-[360px]'>
                {description}
            </p>
        </article>
    )
}

export default CategoriesCard