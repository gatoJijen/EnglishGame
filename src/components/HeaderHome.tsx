import React from 'react'
import NavHome from './NavHome'

const HeaderHome = () => {
    return (
        <header className="flex justify-center pt-4 items-center flex-col gap-8">
            <h1 className="text-white text-6xl drop-shadow-[0px_0px_6px_rgba(0,250,0,1)] ">Game Quiz</h1>
            <NavHome />
        </header>
    )
}

export default HeaderHome