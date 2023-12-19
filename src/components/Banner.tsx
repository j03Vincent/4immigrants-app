import React from 'react'

const Banner = () => {
    return (
        <div className="bg-banner border-b border-black">
            <div className="size flex font-poppins justify-between wrapper items-center bg-banner py-10 lg:py-0">
                <div className="px-10 space-y-5">
                    <h1 className="text-5xl capitalize max-w-xl font-serif lg:text-6xl">
                        Uniendo caminos, construyendo futuros
                    </h1>
                    <h2 className="w-full md:w-[31rem] text-[1.3rem] md:text-[1.5rem] leading-7">
                        En <span className='text-yellow-400'>4Immigrants</span> apostamos por la igualdad de
                        oportunidades para todos.
                    </h2>
                    <button className='btn bg-black1 rounded-full text-white !text-[1.2rem] !px-6 !mt-[2rem]'>
                        Para saber mas
                    </button>
                </div>
                <img
                    className="hidden md:inline-flex h-64 lg:h-full"
                    src="/banner.png"
                    alt=""
                />
            </div>
        </div>
    );
}

export default Banner