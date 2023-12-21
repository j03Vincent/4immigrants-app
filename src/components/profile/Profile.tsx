import React, { useEffect, useState } from 'react'
import ProfilePost from './activities/ProfilePost';
import ProfileLists from './activities/ProfileLists';
import ProfileAbout from './activities/ProfileAbout';
import Modal from '../../utils/Modal';
import { LiaTimesSolid } from 'react-icons/lia';
import { IoSettingsSharp } from 'react-icons/io5';
import { moreActions } from '../../data';
import EditProfile from './activities/EditProfile';
import { User } from '../../context/Context';
import { useParams } from 'react-router-dom';
import useSingleFetch from '../hooks/useSingleFetch';
import Contact from './chat/Contact';

const Profile = () => {
    const { allUsers, currentUser, showModal, setShowModal } = User();
    const { userId } = useParams();

    const activities = [
        {
            title: "Publicaciones",
            comp: ProfilePost,
        },
        {
            title: "Ofertas guardadas",
            comp: ProfileLists,
        },
        {
            title: "Mis datos",
            comp: ProfileAbout,
        },
    ];
    const [currentActive, setCurrentActive] = useState(activities[0]);
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const getUserData = allUsers.find((user: any) => user.id === userId);

    const { data: following } = useSingleFetch("users", userId, "following");
    const { data: followers } = useSingleFetch("users", userId, "followers");

    const [isFollowed, setIsFollowed] = useState(false);
    const { data: myMessages } = useSingleFetch("users", userId, "messages");

    const { data } = useSingleFetch(
        "users",
        currentUser?.uid,
        "following"
    );

    useEffect(() => {
        setIsFollowed(
            data && data?.findIndex((item: any) => item.id === userId) !== -1);

    }, [data, userId])

    return (
        <section className='size flex gap-[4rem] relative'>
            {/* actividades del perfil */}
            <div className='mt-[9rem] flex-[2]'>
                <div className='flex items-center gap-4'>
                    <h2 className='text-3xl sm:text-5xl font-bold capitalize'>
                        {getUserData?.fullname}
                    </h2>
                    <p className='text-gray-500 text-xs sm:text-sm'>Seguidores({followers.length})</p>
                    <p className='text-gray-500 text-xs sm:text-sm'>Siguiendo({following.length})</p>
                </div>
                <div className='flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]'>
                    {activities.map((item, i) => (
                        <div
                            key={i}
                            className={`py-[0.5rem]
                            ${item.title === currentActive.title ? "border-b border-gray-500" : ""}
                        `}>
                            <button onClick={() => setCurrentActive(item)}>
                                {item.title}
                            </button>
                        </div>
                    ))}
                </div>
                <currentActive.comp getUserData={getUserData} setEditModal={setEditModal} />
            </div>

            {/* para abrir la barra lateral */}
            <button
                onClick={() => setModal(true)}
                className='fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white 
                grid place-items-center md:hidden'>
                <IoSettingsSharp />
            </button>

            {/* barra lateral : detalles de la cuenta */}
            <Modal modal={modal} setModal={setModal} >
                <div className={`flex-[1] border-l border-gray-300 p-[2rem] z-10 
                fixed right-0 bottom-0 top-0 w-[18rem] bg-white md:sticky 
                ${modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"} 
                transition-all duration-500`}>
                    <div className='pb-4 text-right'>
                        <button
                            onClick={() => setModal(false)}
                            className='inline-block md:hidden'>
                            <LiaTimesSolid />
                        </button>
                    </div>

                    <div className='sticky top-7 flex flex-col justify-between'>
                        <img
                            className='w-[3.5rem] h-[3.5rem] object-cover rounded-full'
                            src={getUserData?.userImg || "/default-avatar.png"}
                            alt="profile-img"
                            referrerPolicy="no-referrer"
                        />
                        {isFollowed || (myMessages.length > 0 && userId === currentUser?.uid) ?
                            <button
                                onClick={() => setShowModal(true)}
                                className='absolute btn !text-xs !bg-green-700 !text-white !rounded-full right-0'>
                                {isFollowed ? "Contactar" : `Mensajes(${myMessages.length})`}
                            </button>
                            :
                            <></>
                        }
                        <h2 className='py-2 font-bold capitalize'>{getUserData?.fullname}</h2>
                        <p className='text-gray-500 first-letter:uppercase text-sm'>
                            {getUserData?.bio}
                        </p>

                        {currentUser?.uid === getUserData?.userId && (
                            <button
                                onClick={() => setEditModal(true)}
                                className='text-green-500 pt-6 text-sm w-fit'>
                                Editar perfil
                            </button>
                        )}

                        <div className='flex-[1] flex items-center flex-wrap gap-3 pt-8'>
                            {moreActions.map((item, i) => (
                                <button key={i} className='text-xs text-black1'>
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </Modal>
            {editModal && (<EditProfile
                getUserData={getUserData}
                editModal={editModal}
                setEditModal={setEditModal} />
            )}

            {showModal && <Contact userId={userId} showModal={showModal} setShowModal={setShowModal} />}
        </section>
    )
}

export default Profile