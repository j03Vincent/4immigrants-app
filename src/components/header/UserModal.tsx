import React from 'react'
import { LiaUserSolid } from 'react-icons/lia';
import { MdOutlineLocalLibrary } from 'react-icons/md';
import { BiSpreadsheet } from 'react-icons/bi';
import { HiOutlineChartBar } from 'react-icons/hi';
import { LiaEditSolid } from 'react-icons/lia';
import { User } from '../../context/Context';
import { Link, useNavigate } from 'react-router-dom';
import { secretEmail } from '../../utils/Helper';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const UserModal = ({ setModal }: any) => {
    const { currentUser } = User();
    const userModal = [
        {
            title: "Perfil",
            icon: <LiaUserSolid />,
            path: `/profile/${currentUser?.uid}`,

        },
        {
            title: "Ofertas",
            icon: <MdOutlineLocalLibrary />,
            path: "/user",

        },
        {
            title: "Consejos útiles",
            icon: <BiSpreadsheet />,
            path: "/guides",

        },
        {
            title: "Tipos de cambio",
            icon: <HiOutlineChartBar />,
            path: "/currency",

        },
    ];

    const navigate = useNavigate();
    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
            toast.success("El usuario ha cerrado la sesión");

        } catch (error: any) {
            toast.error(error.message)

        }
    }
    return (
        <section className='absolute w-[18rem] p-6 bg-white right-0 top-[100%] 
        shadows rounded-md z-50 text-gray-500'
        >
            <Link to={'/post'} className='flex md:hidden items-center gap-1 text-gray-500'>
                <span className='text-3xl'>
                    <LiaEditSolid />
                </span>
                <span className='text-sm mt-2'>Publicar</span>
            </Link>

            <div className='flex flex-col gap-4 border-b border-gray-300 pb-5'>
                {userModal.map((link, i) => (
                    <Link
                        onClick={() => setModal(false)}
                        className='flex items-center gap-2 text-gray-500 hover:text-black/70'
                        key={i}
                        to={link.path}>

                        <span className='text-2xl'>{link.icon}</span>
                        <h2 className='text-md'>{link.title}</h2>
                    </Link>
                ))}
            </div>

            <button
                onClick={logOut}
                className='flex flex-col pt-5 cursor-pointer hover:text-black/70'>
                Cerrar sesion
                <span className='text-sm'>{secretEmail(currentUser?.email)}</span>
            </button>


        </section>
    );
}

export default UserModal