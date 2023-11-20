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
            <div className='grid place-items-center w-full'>
                <Layout
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