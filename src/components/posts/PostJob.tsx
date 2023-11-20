import React, { useState } from 'react'
import Select from 'react-select';
import Preview from './Preview';
import { User } from '../../context/Context';

const Post = () => {
    const { publish, setPublish } = User();
    const [formData, setFormData] = useState(
        {
            jobtitle: "",
            jobtype: "",
            jobcompany: "",
            joblocation: "",
            jobcontact: "",
            jobsalary: "",
            jobdescription: "",
            photo: "",
        });

    const options = [
        { value: 'fulltime', label: 'Tiempo Completo' },
        { value: 'parttime', label: 'Tiempo Parcial' },
        { value: 'internship', label: 'Practicas' },
    ]
    return (
        <section className='grid place-items-center'>

            <div className='w-[90%] md:w-[80%] lg:w-[60%] py-[3rem]'>
                <h1 className='text-xl'>Rellene los datos de su oferta para continuar.</h1>
                <form className='mt-6'>
                    <div className='flex flex-col justify-between gap-3 mt-2 md:flex-row'>
                        <span className='w-full md:w-1/2'>
                            <label
                                htmlFor="jobtitle"
                                className='block text-sm font-semibold text-gray-600 uppercase'>
                                Titulo
                            </label>
                            <input
                                onChange={(e) => setFormData({ ...formData, jobtitle: e.target.value })}
                                value={formData.jobtitle}
                                type="text"
                                placeholder='Se busca [puesto] en [empresa]'
                                className='w-full py-2 px-3 mb-2 border border-yellow-600 rounded'
                                id='jobtitle'
                                required
                            />
                        </span>

                        <span className='w-full md:w-1/2'>
                            <label htmlFor="jobtype" className='block text-sm font-semibold text-gray-600 uppercase'>
                                Tipo
                            </label>
                            <Select
                                onChange={(e: any) => setFormData({ ...formData, jobtype: e.label })}
                                className=' w-full mb-2 border border-yellow-600 rounded'
                                placeholder="Seleccione el tipo de trabajo"
                                options={options}
                                id='jobtype'
                                required
                            />
                        </span>

                    </div>

                    <div className='flex flex-col justify-between gap-3 mt-2 md:flex-row'>

                        <span className='w-full md:w-1/2'>
                            <label
                                htmlFor="jobcompany"
                                className='block text-sm font-semibold text-gray-600 uppercase'>
                                Empresa
                            </label>
                            <input
                                onChange={(e) => setFormData({ ...formData, jobcompany: e.target.value })}
                                value={formData.jobcompany}
                                type="text"
                                placeholder='Nombre de la empresa o particular'
                                className='w-full py-2 px-3 mb-2 border border-yellow-600 rounded'
                                id='jobcompany'
                                required
                            />
                        </span>

                        <span className='w-full md:w-1/2'>
                            <label
                                htmlFor="joblocation"
                                className='block text-sm font-semibold text-gray-600 uppercase'>
                                Ubicación
                            </label>
                            <input
                                onChange={(e) => setFormData({ ...formData, joblocation: e.target.value })}
                                value={formData.joblocation}
                                type="text"
                                placeholder='Barrio o zona exacta'
                                className='w-full py-2 px-3 mb-2 border border-yellow-600 rounded'
                                id='joblocation'
                                required
                            />
                        </span>
                    </div>

                    <div className='flex flex-col justify-between gap-3 mt-2 md:flex-row'>
                        <span className='w-full md:w-1/2'>
                            <label
                                htmlFor="jobcontact"
                                className='block text-sm font-semibold text-gray-600 uppercase'>
                                Contacto
                            </label>
                            <input
                                onChange={(e) => setFormData({ ...formData, jobcontact: e.target.value })}
                                value={formData.jobcontact}
                                type="text"
                                placeholder='Numero de contacto'
                                className='w-full py-2 px-3 mb-2 border border-yellow-600 rounded'
                                id='jobcontact'
                                required
                            />

                        </span>

                        <span className='w-full md:w-1/2'>
                            <label
                                htmlFor="jobsalary"
                                className='block text-sm font-semibold text-gray-600 uppercase'>
                                Sueldo
                            </label>
                            <input
                                onChange={(e) => setFormData({ ...formData, jobsalary: e.target.value })}
                                value={formData.jobsalary}
                                type="text"
                                placeholder='Importe o "A convenir"'
                                className='w-full py-2 px-3 mb-2 border border-yellow-600 rounded'
                                id='jobsalary'
                                required
                            />
                        </span>

                    </div>

                    <div className='flex flex-col mt-4'>
                        <label
                            htmlFor="jobdescription"
                            className='block text-sm font-semibold text-gray-600 uppercase'>
                            Descripción
                        </label>
                        <textarea
                            onChange={(e) => setFormData({ ...formData, jobdescription: e.target.value })}
                            value={formData.jobdescription}
                            placeholder='Descripcion general del puesto (aqui puedes añadir responsabilidades y requisitos)'
                            rows={4}
                            className='w-full py-2 px-3 mb-1 border border-yellow-600 rounded'
                            id='jobdescription'
                            required
                        />
                    </div>




                </form>

                {/* <button type="submit"
                    className='btn w-full !py-2 !bg-green-700 !text-white !rounded'>
                    Publicar
                </button> */}

                <div className={`${publish ? "visisble opacity-100" : "invisible opacity-0"} 
                transition-all duration-200`}>
                    <Preview formData={formData} setFormData={setFormData} setPublish={setPublish} />
                </div>

            </div>



        </section>
    )
}

export default Post