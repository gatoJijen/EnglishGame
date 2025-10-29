import { Categories } from '@/interfaces/db'
import Image from 'next/image'
import React from 'react'
interface Question {
  quest: string;
  correct: string;
  incorrects: string[];
}

interface GameData {
  title: string;
  description: string;
  type: string;
  url: string;
  categoryId: string;
  quests: Question[];
  grade: number;
}

const GamesCard = ({ title, description, type, url, categoryId, quests, grade}:GameData) => {

    return (
        <article className='bg-white/10 rounded-xl w-full flex justify-between items-center p-4 nImgGame'>
            <header className='flex flex-col gap-2 primary-text '>
                <h1 className='font-bold text-2xl'>
                    {title}
                </h1>
                <p className='opacity-40 nHidde'>
                    {description}
                </p>
            </header>
            <picture className=''>
                <Image className='w-[120px] h-[100px] ' src={url} alt={title} width={240} height={240}/>
            </picture>
        </article>
    )
}

export default GamesCard