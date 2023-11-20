import React from 'react'
import useSingleFetch from '../../hooks/useSingleFetch';
import { User } from '../../../context/Context';
import Loading from '../../Loading';
import JobsCard from '../../posts/JobsCard';
import { BiLock } from 'react-icons/bi';

const ProfileLists = ({ getUserData }: any) => {
    const { currentUser } = User();
    const { data, loading } = useSingleFetch(
        "users",
        currentUser?.uid,
        "saveJobs"
    );



    return (
        <div>
            {/* condicion para que solo el usuario pueda ver su oferta guardada */}
            {currentUser?.uid === getUserData?.userId ? (
                <div className='flex flex-col gap-[2rem] mb-[2rem]'>
                    {data.length === 0 && (
                        <p className='text-gray-500'>
                            <span className='capitalize mr-1'>{getUserData?.fullname}</span>{" "}
                            no tiene ninguna oferta guardada
                        </p>
                    )}
                    {loading ? <Loading /> : data?.map((offer: any, i: any) => <JobsCard offer={offer} key={i} />)}
                </div>
            ) : (
                <PrivateLists fullname={getUserData?.fullname} />
            )}
        </div>
    )
}

export default ProfileLists;

const PrivateLists = ({ fullname }: any) => {
    return (
        <div className='flex flex-col justify-center items-center gap-[3rem] text-center'>
            <p><span className='capitalize'>{fullname}</span> mantiene sus ofertas guardadas en privado</p>
            <span className='text-[10rem] text-gray-500'>
                <BiLock />
            </span>
        </div>
    )
};