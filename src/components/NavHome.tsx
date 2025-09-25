import React from 'react'
import LiHome from './LiHome'

const NavHome = () => {
    return (
        <nav className="flex w-dvw justify-center h-[50px] items-center">
            <ul className="flex border-b-2 text-white border-b-white h-full justify-center gap-32 items-center w-[80%] text-lg">
                <LiHome text="Juegos" url="/" />
                <LiHome text="Categorias" url="/" />
                <LiHome text="Grados" url="/" />
                <LiHome text="Pruebas" url="./prueba" />
            </ul>
        </nav>
    )
}

export default NavHome