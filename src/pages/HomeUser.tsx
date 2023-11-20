import React from 'react'
import Jobs from '../components/posts/Jobs'
import Follow from '../components/networking/Follow'

const HomeUser = () => {
    return (
        <section className='size flex gap-[5rem] relative'>
            <div className='flex-[2] py-10 mb-[4rem]'>
                <Jobs />

            </div>

            <div className='hidden md:inline-block md:w-[21rem] p-7 border-l border-gray-300'>
                <h3>Usuarios que te pueden interesar</h3>
                <Follow />
            </div>
        </section>
    )
}

export default HomeUser