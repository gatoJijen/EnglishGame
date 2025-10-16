import React from 'react'
import ArticleGameF from './ArticleGameF'
import feature1 from '@/../public/feature1.jpeg'
import feature2 from '@/../public/feature2.jpeg'
import feature3 from '@/../public/feature3.jpeg'


const FeaturedGames = () => {
    return (
        <section className='mt-8'>
            <header>
                <h1 className='primary-text font-bold text-2xl'>Featured Games</h1>
            </header>
            <section className='flex justify-between items-center gap-8'>
                <ArticleGameF title='Mystic Realms' description='Embark on a journey through enchanted forests and mythical creatures.' src={feature1}/>
                <ArticleGameF title='Cyberpunk Challenge' description='Test your knowledge of technology and virtual worlds.' src={feature2}/>
                <ArticleGameF title='Lost Civilizations' description='Uncover the secrets of forgotten empires and historical artifacts.' src={feature3}/>

            </section>
        </section>
    )
}

export default FeaturedGames