import React from 'react'
import { category, moreActions } from '../data'

const Category = () => {
    return (
        <div className='sticky top-[6rem]'>
            <div className='border-b border-gray-400 pb-7'>
                <h2 className='font-semibold'>Descubre las ofertas que te interesan</h2>
                <div className='my-2 flex items-center gap-3 flex-wrap'>
                    {category.map((item, i) => (
                        <button
                            key={i}
                            className='bg-gray-200 py-2 px-3 text-sm rounded-full'>
                            {item}
                        </button>
                    ))}
                </div>

                <button className='text-green-600 text-sm py-3 hover:text-black1'>
                    Ver mas categorias
                </button>
            </div>
            <div className='flex items-center flex-wrap gap-3 leading-3 pt-8'>
                {moreActions.map((item, i) => (
                    <button key={i} className='text-md text-black-1'>{item}</button>
                ))}
            </div>
        </div>
    )
}

export default Category