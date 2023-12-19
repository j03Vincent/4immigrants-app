import React, { useEffect, useRef } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Accordion = ({ question, answer, turn, setTurn, idx, link }: any) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = turn![idx] ? `${contentRef.current.scrollHeight}px` : "0px"
        }

    }, [contentRef, turn, idx])

    const toggleAccordion = () => {
        let newTurn = [...turn!]
        newTurn[idx] = !newTurn[idx]
        setTurn!(newTurn)
    }
    return (
        <div className='flex flex-col items-center justify-center w-full px-2 text-lg pt-4 lg:text-base'>
            <button onClick={toggleAccordion}
                className={`bg-transparent px-5 shadow cursor-pointer w-full h-full ${turn![idx]}`}>
                <div className='py-3'>
                    <div className='flex items-center justify-between h-14 text-left'>
                        <span className='ml-2 font-medium lg:font-semibold lg:text-xl text-sm text-[#ffc300]'>{question}</span>
                        <div>
                            {turn![idx] ?
                                <AiOutlineMinus className='w-[20px] h-[20px]' />
                                :
                                <AiOutlinePlus className='w-[20px] h-[20px]' />
                            }

                        </div>
                    </div>
                    <div ref={contentRef} className='mx-4 overflow-hidden text-left transition-all duration-500 h-full'>
                        <p className='py-1 font-normal leading-normal text-justify whitespace-pre-line text-xs lg:text-lg'>
                            {answer}
                            <br />
                            Mas información en: <a href={link} target="_blank" rel="noreferrer" className='underline text-blue-600'>{link}</a>
                        </p>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default Accordion