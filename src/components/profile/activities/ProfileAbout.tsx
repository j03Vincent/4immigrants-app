import React from 'react'
import { User } from '../../../context/Context';

const ProfileAbout = ({ getUserData, setEditModal }: any) => {
    const { currentUser } = User();
    return (
        <div className='w-full'>
            <p className='text-2xl first-letter:uppercase'>
                {getUserData?.bio || getUserData?.fullname + " aun no tiene una descripcion personal"} <br /><br />

                {getUserData?.field && (
                    <span>
                        He trabajado anteriormente en el {getUserData.field.value} <br /><br />
                    </span>
                )}

                {getUserData?.skills && (
                    <span>
                        Estas son mis habilidades destacadas: <br />
                        {getUserData.skills.map((skill: any) => (
                            <span key={skill.value}>{skill.label}, </span>
                        ))}
                    </span>
                )}

                {!getUserData?.field && !getUserData?.skills &&
                    getUserData?.fullname + " aún no ha proporcionado información adicional sobre el sector profesional o habilidades"
                }
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