import Link from 'next/link';
import React from 'react'

interface Props {
    title: string;
    ref: string;
    points: number;
    rounds: number;
    totalR: number;
}


const NavGame = ({title, ref, points, rounds, totalR}: Props) => {
  return (
    <nav className='flex justify-between px-6 items-center border-b-white/20 border-b py-[0.85rem]'>
        <header className='flex gap-4 items-center'>
            <Link className='bg-white/20 rounded-full w-[40px] h-[40px] flex justify-center items-center text-red-500' href={ref}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 14l-4 -4l4 -4" /><path d="M5 10h11a4 4 0 1 1 0 8h-1" /></svg>
            </Link>
            <h1 className='primary-text text-xl font-bold'>
                {title}
            </h1>
        </header>
        <footer className='flex gap-4 items-center'>
            <div className='bg-white/20 w-[180px] h-[2.5rem] p-2 text-center rounded-lg'>
                Points: {points}
            </div>
            <div className='bg-white/20 w-[180px] h-[2.5rem] p-2 text-center rounded-lg'>
                Rounds: {rounds} / {totalR}
            </div>
        </footer>
    </nav>
  )
}

export default NavGame