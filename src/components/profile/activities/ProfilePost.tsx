import React from 'react'
import useFetch from '../../hooks/useFetch';
import Loading from '../../Loading';
import JobsCard from '../../posts/JobsCard';

const ProfilePost = ({ getUserData }: any) => {
    const { data, loading } = useFetch("offers");
    const userOffer = data && data?.filter((offer: any) => offer.userId === getUserData?.userId)

    return (
        <div className='flex flex-col gap-5 mb-[4rem]'>
            {userOffer.length === 0 && (
                <p className='text-gray-500'>
                    <span className='capitalize'>{getUserData?.fullname} </span>
                    no tiene publicaciones
                </p>
            )}
            {loading ? (
                <Loading />
            ) : (
                userOffer.map((offer: any, i: any) => <JobsCard offer={offer} key={i} />)
            )}

        </div>
    )
}

export default ProfilePost