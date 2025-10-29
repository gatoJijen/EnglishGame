import Link from 'next/link'
import React from 'react'

interface Props {
    toggle: ()=> void
}


const ToggleNav = ({toggle}:Props) => {
    return (
        <ul className='text-decoration-none bg-background min-w-[15rem] rounded-lg list-none flex flex-col absolute top-[0] py-[1rem] left-[0rem] gap-4 h-[100dvh] z-[999] '>
            <button onClick={toggle} className='flex items-center pl-2'>
                <picture>
                    <svg className='fill-blue-700 stroke-0 w-[40px] h-auto' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" />
                        <path d="M9 4v13" />
                        <path d="M15 7v13" />
                    </svg>
                </picture>
            </button>
            <Link className='transition-all hover:text-blue-400 primary-border-b-20 py-2 bg-background-2-20 pl-2' href="/dashboard">
                <li>Home</li>
            </Link>
            <Link className='transition-all hover:text-blue-400 primary-border-b-20 py-2 bg-background-2-20 pl-2' href="/dashboard/categories">
                <li>Categories</li>
            </Link>
            <Link className='transition-all hover:text-blue-400 primary-border-b-20 py-2 bg-background-2-20 pl-2' href="/dashboard/leaderBoard">
                <li >Leaderboard</li>
            </Link>
            <Link className='transition-all hover:text-blue-400 primary-border-b-20 py-2 bg-background-2-20 pl-2' href="/dashboard/Grades">
                <li>Grade</li>
            </Link>
        </ul>
    )
}

export default ToggleNav