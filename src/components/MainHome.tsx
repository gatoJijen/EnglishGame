import React from 'react'
import GameCart from './GameCart'

const MainHome = () => {
  return (
    <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8'>
        <GameCart url='./prueba'/>
    </main>
  )
}

export default MainHome