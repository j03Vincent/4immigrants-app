import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { nav } from "../../data";
import Auth from '../Auth';

const Header = () => {
    const [isActive, setIsActive] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const scrollMe = () => {
            window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
        };
        window.addEventListener("scroll", scrollMe);

    }, []);
    return (
        // conditional styling al hacer scroll
        <header className={`border-b border-black sticky top-0 z-50 
        ${isActive ? "bg-white" : "bg-banner"} transition-all duration-500`}>
            < div className='size h-[70px] flex items-center justify-between' >
                <Link to={"/"}>
                    <img
                        className='h-[4rem]'
                        src="/headericon.png"
                        alt="logo"
                    />
                </Link>
                <div className='flex items-center gap-5'>
                    <div className='hidden text-base sm:flex items-center gap-5'>
                        {nav.map((link, i) => (
                            <Link key={i} to={link.path}>{link.title}</Link>
                        ))}
                    </div>
                    <div className='relative'>
                        <button
                            onClick={() => setModal(true)}
                            className='hidden text-sm sm:flex items-center gap-5'>
                            Entra
                        </button>
                        <Auth modal={modal} setModal={setModal} />
                    </div>
                    <div>
                        <button
                            onClick={() => setModal(true)}
                            className={`text-white rounded-full px-3 p-2 text-sm font-medium 
                        ${isActive ? "bg-green-500" : "bg-black"}`}>
                            Registrate
                        </button>
                    </div>
                </div>
            </div >

        </header >
    )
}

export default Header