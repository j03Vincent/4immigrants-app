import React, { useState } from 'react'
import Layout from '../components/tips/Layout';
import { guide } from '../data';

const Awareness = () => {
    const [active, setActive] = useState([false, false, false, false, false]);
    const isSomeActive = active.some((element) => element);
    const handleClick = () => {
        isSomeActive
            ? setActive([false, false, false, false, false])
            : setActive([true, true, true, true, true, true]);
    };

    return (
        <>
            <div className='flex place-items-center w-full md:grid'>
                <Layout
                    className='w-full md:w-[31rem] text-[1.3rem] md:text-[1.5rem] leading-7'
                    handleClick={handleClick}
                    isSomeActive={isSomeActive}
                    data={guide}
                    turn={active}
                    setTurn={setActive}
                />
            </div>

        </>
    )
}

export default Awareness