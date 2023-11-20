import React from 'react'
import Accordion from './Accordion'
import { CiSquareChevDown } from 'react-icons/ci'

const Layout = ({ handleClick, isSomeActive, data, turn, setTurn }: any) => {
    return (
        <div className='items-center flex flex-col lg:w-7/12 lg:mt-7 w-full my-5 px-4'>
            <span className='text-3xl px-6 py-3 text-white rounded-md bg-gradient-to-r from-orange-700 to-yellow-500'>
                Consejos útiles
            </span>
            <p className='text-center mt-2'>
                Intentaremos explicar estos temas de la mejor manera posible. <br />
                <span className='text-sm italic'>Casi toda la información facilitada aqui está recogida en la Ley Orgánica 4/2000,
                    de 11 de enero (<a href="https://www.boe.es/eli/es/lo/2000/01/11/4" className='text-blue-600'>BOE-A-2000-544</a>).
                </span>
            </p>
            <div className='flex items-center justify-between w-full mb-6 lg:justify-end'>
                <button
                    className="flex items-center mr-3 space-x-1 text-sm font-bold lg:text-base lg:space-x-2 py-2 px-4 bg-slate-50"
                    onClick={handleClick}
                >
                    <span className="text-indigo-500 min-w-fit text-ellipsis">
                        {!isSomeActive ? "Abrir todo" : "Cerrar todo"}
                    </span>
                    <div
                        className={`relative transition-all ease-in-out duration-200 
                        ${isSomeActive ? " rotate-180" : "rotate-0"}`}

                    >
                        <CiSquareChevDown className='w-[40px] h-[40px]' />

                    </div>
                </button>
            </div>

            {data.map((el: any, i: any) => {
                return (
                    <div className='w-full' key={"questions" + i}>
                        <Accordion
                            question={el.question}
                            answer={el.answer}
                            turn={turn}
                            setTurn={setTurn}
                            idx={el.idx}
                        />
                    </div>
                )
            })}
        </div>
    )
}
export default Layout