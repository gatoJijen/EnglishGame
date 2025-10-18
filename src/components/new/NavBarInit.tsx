"use client"

import { auth } from '@/firebase/config';
import { useTheme } from '@/hooks/useTheme';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { CiMap, CiSearch } from 'react-icons/ci'
import { FiLogOut } from 'react-icons/fi';
import { IoMoon, IoMoonOutline, IoSunny, IoSunnyOutline } from 'react-icons/io5';

interface Props {
    ul?: boolean,
    button?: boolean,
    img?: string,
    user?: string,

}


const NavBarInit = ({ ul, button, img, user }: Props) => {
    const { theme, toggleTheme } = useTheme();
    const router = useRouter()




    const handleLogout = async () => {
        try {
            // Cerrar sesión en Firebase
            await signOut(auth);

            // Limpiar los datos de autenticación en localStorage
            localStorage.removeItem("authToken");
            localStorage.removeItem("userEmail");

            // Redirigir a la página de inicio ("/")
            router.push("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const [abrir, setAbrir] = useState(false)
    const [hover1, setHover1] = useState(false)
    const [hover2, setHover2] = useState(false)
    const togglehover1 = () => setHover1(!hover1)
    const togglehover2 = () => setHover2(!hover2)
    const toggleModal = () => setAbrir(!abrir)

    return (
        <nav className='flex justify-between px-6 items-center border-b-white/20 border-b py-[0.85rem]'>
            <header className='flex gap-2 items-center '>
                <picture>
                    <svg className='fill-blue-700 stroke-0 w-[40px] h-auto' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" />
                        <path d="M9 4v13" />
                        <path d="M15 7v13" />
                    </svg>
                </picture>
                <Link href={`${ul ? '/dashboard' : '#'}`} className='primary-text text-xl font-bold'>
                    Trivia Titans
                </Link>
                {ul ? (
                    <ul className='flex items-center justify-center ml-4 gap-4'>
                        <Link className='transition-all hover:text-blue-400 ' href="/dashboard">
                            <li>Home</li>
                        </Link>
                        <Link className='transition-all hover:text-blue-400 ' href="/dashboard/categories">
                            <li>Categories</li>
                        </Link>
                        <Link className='transition-all hover:text-blue-400 ' href="/dashboard/leaderBoard">
                            <li >Leaderboard</li>
                        </Link>
                        <Link className='transition-all hover:text-blue-400 ' href="/dashboard/Grades">
                            <li>Grade</li>

                        </Link>
                    </ul>
                ) : ""}
            </header>
            {button ? (
                <footer className='flex gap-2.5'>
                    <article className="w-[250px] h-[40px] py-2 px-4 border border-white/20 rounded-lg flex justify-center items-center gap-3">
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="primary-text opacity-70">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                        </svg>
                        <input className='w-full focus:outline-0' placeholder="Search Games..." type="text" />
                    </article>
                    <picture>
                        <button onClick={toggleModal} className='w-[42px] h-[42px] focus:outline-0 cursor-pointer rounded-full mr-[16.4px]'>
                            <Image className='rounded-full' src={`${img}`} alt='user foto' width={100} height={100} />

                        </button>
                    </picture>
                    {abrir ? (
                        <ul className='text-decoration-none bg-toolbar min-w-[15rem] rounded-lg list-none flex flex-col absolute top-[10.5svh] py-[1rem] right-[0.85rem] gap-2 justify-center  '>
                            <li className=' text-white  flex flex-col items-center '>
                                <p className='text-lg font-bold'>{user}</p>
                            </li>
                            <li onClick={toggleTheme} onMouseEnter={togglehover1} onMouseLeave={togglehover1} className={`flex items-center gap-[1rem] ${hover1 ? 'bg-white/90 htoolbar-text text-black' : 'text-white toolbar-text'}transition-all  cursor-pointer  px-5 h-10`}>{theme === 'light' ? (hover1 ? <IoSunny size={30} color='black' /> : <IoSunnyOutline size={30} color='white' />) : (hover1 ? <IoMoon className='mb-1 ml-1' size={24} color='black' /> : <IoMoonOutline className='mb-1 ml-1' size={28} color='white' />)}
                                {theme === 'light' ? ' Modo Claro' : ' Modo Oscuro'}</li>
                            <li onClick={handleLogout} onMouseEnter={togglehover2} onMouseLeave={togglehover2} className={`h-10 cursor-pointer  px-5 flex items-center gap-[1rem] ${hover2 ? ' bg-white/90 htoolbar-text text-black' : 'text-white toolbar-text'}transition-all `}>{hover2 ? <FiLogOut size={30} color='black' /> : <FiLogOut size={30} color='white' />}Salir</li>
                        </ul>
                    ) : <div className='absolute hidden opacity-0'></div>

                    }
                </footer>

            ) : ""

            }
        </nav>
    )
}

export default NavBarInit