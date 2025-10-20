import React from 'react'

interface Props {
    title: string | null;
}
const categoryMap: Record<string, string> = {
  '1': 'General Knowledge',
  '2': 'Science & Nature',
  '3': 'World History',
  '4': 'Pop Culture',
  '5': 'Geography Explorer',
  '6': 'Literary Classics',
  '7': 'Art & Music',
  '8': 'Sports & Games',
  '9': 'Technology & Innovation',
  '10': 'Movies & Shows',
  '11': 'Food & Cuisine',
  '12': 'Travel & Adventure',
  // Agrega más mapeos según sea necesario
};

const CategoryHeader = ({title}:Props) => {
  const displayTitle = title ? categoryMap[title] || title : 'Categoría';
  return (
    <header className='mt-10 mb-4 justify-start flex items-center text-center'>
        <h1 className='font-bold text-4xl primary-text'>{displayTitle}</h1>
    </header>
  )
}

export default CategoryHeader