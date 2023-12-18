import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { User } from '../../context/Context';
import FollowBtn from './FollowBtn';
import { useNavigate } from 'react-router-dom';

const Follow = () => {
    const { data } = useFetch("users");
    const [count, setCount] = useState(5);
    const { currentUser, allUsers } = User();

    const getUserData = allUsers.find((user: any) => user.id === currentUser?.uid);

    const users =
        data &&
        data?.slice(0, count).filter((user: any) => user.userId !== currentUser?.uid)
            .sort((a: any, b: any) => {
                const fieldA = a.field?.value;
                const fieldB = b.field?.value;
                const currentUserField = getUserData?.field?.value;
                /* Ordena la lista de usuarios de manera que aquellos con el mismo valor del field (sector)
                 que el usuario actual se sitúan primero */

                if (fieldA === currentUserField && fieldB !== currentUserField) {
                    return -1;
                    /* Si el valor del sector del usuario A es igual al del usuario actual (currentUserField)
                    entonces A se coloca antes de B. */
                } else if (fieldB === currentUserField && fieldA !== currentUserField) {
                    return 1;
                } else {
                    return 0;
                    // Si no se cumple ninguna de las condiciones anteriores, no hay prioridad específica 
                }
            });

    const navigate = useNavigate();

    return (
        <>
            {data && users?.map((user: any, i: any) => {
                const { fullname, bio, userImg, userId } = user;
                return (
                    <div
                        key={i}
                        className='flex items-start gap-2 my-4' >
                        <div
                            onClick={() => navigate(`/profile/${userId}`)}
                            className='flex-1 flex items-center gap-2 cursor-pointer'>
                            <img
                                className='w-[3rem] h-[3rem] object-cover cursor-pointer rounded-full'
                                src={userImg ? userImg : "/default-avatar.png"}
                                alt="userImg"
                                referrerPolicy="no-referrer"
                            />
                            <div className='flex flex-col gap-1'>
                                <h2 className='font-bold capitalize'>{fullname}</h2>
                                <span className='leading-4 text-gray-500 text-sm line-clamp-2'>
                                    {bio || "Este usuario aun no se ha presentado"}
                                </span>
                            </div>
                        </div>
                        <FollowBtn userId={userId} />
                    </div >
                );
            })}
            {data?.length > 5 && (
                <button
                    onClick={() => setCount((prev: any) => users.length < data?.length && prev + 3)}
                    className='mb-3 text-green-900 text-sm hover:underline'>
                    Ver mas usuarios
                </button>
            )}
        </>
    );
};

export default Follow