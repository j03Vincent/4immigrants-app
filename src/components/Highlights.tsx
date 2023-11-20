import React from 'react'
import { GrUserWorker } from "react-icons/gr";
import { HiLightBulb } from 'react-icons/hi'
import { MdWorkHistory } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";

const Highlights = () => {
    // idea para los consejos

    const data = [
        {
            id: 1,
            icon: <GrUserWorker />,
            title: 'Red de contactos',
            desc: "Consulta el perfil de otros usuarios"
        },
        {
            id: 2,
            icon: <HiLightBulb />,
            title: 'Gestión del conocimiento',
            desc: "Fácil acceso a consejos e información útil"
        },
        {
            id: 3,
            icon: <MdWorkHistory />,
            title: 'Ofertas detalladas',
            desc: "Formularios que recogen todos los datos"
        },
        {
            id: 4,
            icon: <FaAddressCard />,
            title: 'Comparte tu experiencia',
            desc: "Crea tu propio perfil profesional"
        }
    ]
    return (
        <div className="size font-poppins mt-10 text-center">
            <h2 className="text-5xl font-serif mb-10 border-b-4 border-indigo-400 inline-block">
                Te damos la bienvenida
            </h2>
            <p className="text-2xl mb-10 mt-3 px-[1rem] lg:px-[10rem]">
                <span className='text-yellow-400'>4Immigrants</span> se concibe como una herramienta destinada a facilitar el acceso a oportunidades laborales
                para aquellos que buscan establecerse en un nuevo territorio. La idea es ofrecer una plataforma que no solo simplifique la búsqueda de empleo,
                <br />sino que también fomente la inclusión y la difusión de información social-laboral relevante.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
                {data.map((item) => (
                    <div key={item.id} className='flex flex-col items-center p-6 bg-banner rounded-lg'>
                        <div className='flex mb-3 items-center justify-center w-16 h-16 rounded-md bg-[#7E90FE1A] text-yellow-600 text-3xl'>
                            {item.icon}
                        </div>
                        <div className='ml-0'>
                            <h3 className='text-xl font-semibold'>{item.title}</h3>
                            <p className='text-[#A3A3A3]'>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Highlights