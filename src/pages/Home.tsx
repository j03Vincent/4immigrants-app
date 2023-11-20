import React from 'react'
import Banner from '../components/Banner'
import Highlights from '../components/Highlights'
import Category from '../components/Category'
import Jobs from '../components/posts/Jobs'

const Home = () => {
    return (
        <>
            <Banner />
            <Highlights />
            <div className='size py-7 flex flex-col-reverse md:flex-row gap-[7rem]'>
                <div className='flex-[1.5]'>
                    <Jobs />
                </div>
                <div className='flex-[1] relative'>
                    <Category />
                </div>
            </div>
        </>

    )
}

export default Home