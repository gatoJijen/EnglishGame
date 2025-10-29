import React from 'react'

interface Props {
  name: string;
}

const HomeHeader = ({name}:Props) => {
  return (
    <header className='flex flex-col gap-2 mt-5 primary-text nHomeHeader'>
        <h1 className='font-bold text-4xl'>
          Welcome back, {name}!
        </h1>
        <p className='opacity-60 text-xl'>
          Ready to test your knowledge?
        </p>
    </header>
  )
}

export default HomeHeader