import React from 'react'
import ArticleGameF from './ArticleGameF'


const FeaturedGames = () => {
    return (
        <section className='mt-12'>
            <header>
                <h1 className='primary-text font-bold text-3xl'>Featured Games</h1>
            </header>
            <section className='flex justify-between items-center gap-6 overflow-x-auto nCarruselFeature'>
                <ArticleGameF title='Mystic Realms' description='Embark on a journey through enchanted forests and mythical creatures.' src={'/feature1.png'}/>
                <ArticleGameF title='Cyberpunk Challenge' description='Test your knowledge of technology and virtual worlds.' src={'/feature2.png'}/>
                <ArticleGameF title='Lost Civilizations' description='Uncover the secrets of forgotten empires and historical artifacts.' src={'/feature3.png'}/>

            </section>
        </section>
    )
}

export default FeaturedGames