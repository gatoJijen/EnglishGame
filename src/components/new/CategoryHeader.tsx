import React from 'react'

interface Props {
    title: string;
}

const CategoryHeader = ({title}:Props) => {
  return (
    <header className='mt-14 w-full justify-center flex items-center text-center'>
        <h1 className='font-bold text-4xl primary-text'>Juegos {title}</h1>
    </header>
  )
}

export default CategoryHeader