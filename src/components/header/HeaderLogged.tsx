import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { LiaEditSolid } from 'react-icons/lia';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import Modal from '../../utils/Modal';
import UserModal from './UserModal';
import Search from './Search';
import { User } from '../../context/Context';
import Loading from '../Loading';

const HeaderLogged = () => {
    const { allUsers, userLoading, currentUser, setPublish } = User();
    const [modal, setModal] = useState(false);
    const [searchModal, setSearchModal] = useState(false);

    const { pathname } = useLocation();

    const getUserData = allUsers.find((user: any) => user.id === currentUser?.uid)

    return (
        <header className='border-b border-gray-200'>
            {userLoading && <Loading />}
            <div className='size h-[60px] flex items-center justify-between'>

                {/* parte izquierda */}
                <div className='flex items-center gap-3'>
                    <Link to={"/user"}>
                        <span className='text-5xl'>
                            <img
                                className='h-[3rem]'
                                src="/app-icon.png"
                                alt="logo"
                            />
                        </span>
                    </Link>
                    <Search modal={searchModal} setModal={setSearchModal} />
                </div>

                {/* parte derecha */}
                <div className='flex items-center gap-3 sm:gap-7'>
                    <span
                        onClick={() => setSearchModal(true)}
                        className='flex sm:hidden text-3xl text-gray-500 cursor-pointer'>
                        <CiSearch />
                    </span>

                    {pathname === "/postjob" ? (
                        <button
                            onClick={() => setPublish(true)}
                            className='btn !bg-green-700 !py-1 !text-white !rounded-full'>
                            Publicar
                        </button>
                    ) : (
                        <Link
                            to={'/postjob'}
                            className='hidden md:flex items-center gap-1 text-gray-500'>
                            <span className='text-3xl'>
                                <LiaEditSolid />
                            </span>
                            <span className='text-sm mt-1'>Publicar</span>
                        </Link>
                    )}

                    <span className='text-3xl text-gray-500 cursor-pointer'>
                        <IoMdNotificationsOutline />
                    </span>

                    <div className='flex items-center relative'>
                        <img
                            onClick={() => setModal(true)}
                            className='w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer'
                            src={getUserData?.userImg ? getUserData?.userImg : "/default-avatar.png"}
                            alt="profile-img"
                            referrerPolicy="no-referrer"
                        />
                        <span className='text-gray-500 cursor-pointer'><MdKeyboardArrowDown /></span>

                        <Modal modal={modal} setModal={setModal}>
                            <div className={`${modal ? "visible opacity-100" : "invisible opacity-0"} 
                            transition-all duration-100`}>
                                <UserModal setModal={setModal} />
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderLogged