import React from 'react'
import { User } from '../../../context/Context';

const ProfileAbout = ({ getUserData, setEditModal }: any) => {
    const { currentUser } = User();
    return (
        <div className='w-full'>
            <p className='text-2xl first-letter:uppercase'>
                {getUserData?.bio || getUserData?.fullname + " aun no tiene una descripcion personal"} <br /><br />
                {getUserData?.skills ?
                    `Estas son mis habilidades destacadas: ${getUserData?.skills}`
                    :
                    getUserData?.fullname + " aún no ha escrito sus habilidades"}
            </p>
            <div className='text-right'>
                {currentUser?.uid === getUserData.userId && (
                    <button
                        onClick={() => setEditModal(true)}
                        className='border border-black py-2 px-5 rounded-full text-black mt-[3rem]'>
                        Editar
                    </button>
                )}

            </div>
        </div>
    )
}

export default ProfileAbout