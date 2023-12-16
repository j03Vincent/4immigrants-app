import { addDoc, collection } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { LiaTimesSolid } from 'react-icons/lia';
import TagsInput from 'react-tagsinput';
import { toast } from 'react-toastify';
import { db, storage } from '../../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { User } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
// import Select from 'react-select';

const Preview = ({ formData, setFormData, setPublish }: any) => {
    const imageRef = useRef<any>(null);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const [tags, setTags] = useState([]);
    const { currentUser, allUsers } = User();
    const [loading, setLoading] = useState(false);

    const getUserData = allUsers.find((user: any) => user.id === currentUser?.uid);
    const validNum = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;

    const handleClick = () => {
        imageRef.current.click();

    };

    // const options = [
    //     { value: 'fulltime', label: 'Tiempo Completo' },
    //     { value: 'parttime', label: 'Tiempo Parcial' },
    //     { value: 'internship', label: 'Practicas' },
    // ];

    // useEffect(() => {
    //     if (formData["jobtitle"] | formData["jobtype"] || formData["jobcompany"] || formData["joblocation"] ||
    //         formData["jobcontact"] || formData["jobsalary"] || formData["jobdescription"]) {
    //         setFormData({
    //             ...formData, jobtitle: formData.jobtitle, jobtype: formData.jobtype, jobcompany: formData.jobcompany,
    //             joblocation: formData.joblocation, jobcontact: formData.jobcontact, jobsalary: formData.jobsalary, jobdescription: formData.jobdescription
    //         })

    //     } else {
    //         setFormData({
    //             ...formData, jobtitle: "", jobtype: "", jobcompany: "",
    //             joblocation: "", jobcontact: "", jobsalary: "", jobdescription: ""
    //         })
    //     }

    // }, [setFormData, formData])

    const handleSubmit = async () => {
        setLoading(true);

        try {
            if (formData.jobtitle === "" || formData.jobtype === "" || formData.jobcompany === "" || formData.joblocation === "" ||
                formData.jobcontact === "" || formData.jobsalary === "" || formData.jobdescription === "" || tags.length === 0) {
                toast.error("Todos los campos son obligatorios");
                return;
            }
            if (!formData.jobcontact.match(validNum)) {
                toast.error("El número de contacto debe ser válido");
                return;
            }
            if (formData.jobtitle.length < 15) {
                toast.error("El título debe tener al menos 15 caracteres");
                return;
            }
            if (formData.jobdescription.length < 25) {
                toast.error("La descripción debe ser lo suficientemente amplia");
                return;
            }

            const collections = collection(db, "offers");
            const storageRef = ref(storage, `image/${formData.photo.name}`);
            await uploadBytes(storageRef, formData?.photo)

            const imageUrl = await getDownloadURL(storageRef);

            await addDoc(collections, {
                userId: currentUser?.uid,
                jtitle: formData.jobtitle,
                jtype: formData.jobtype,
                jcompany: formData.jobcompany,
                jlocation: formData.joblocation,
                jcontact: formData.jobcontact,
                jsalary: formData.jobsalary,
                jdescription: formData.jobdescription,
                tags: tags,

                postImg: imageUrl,
                created: Date.now(),
                offerViews: 0,
                offerStatus: true,

            });
            toast.success("La oferta ha sido publicada");
            navigate("/user");
            setPublish(false);
            setFormData(
                {
                    jobtitle: "",
                    jobtype: "",
                    jobcompany: "",
                    joblocation: "",
                    jobcontact: "",
                    jobsalary: "",
                    jobdescription: "",
                    photo: "",
                }
            );

        } catch (error: any) {
            toast.error(error.message);

        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='absolute inset-0 bg-white z-30'>
            <div className='size my-[2rem]'>
                <span
                    onClick={() => setPublish(false)}
                    className='absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer'>
                    <LiaTimesSolid />
                </span>

                <div className='mt-[8rem] flex flex-col md:flex-row gap-10'>

                    {/* izquierda */}
                    <div className='flex-[1]'>
                        <h3>Vista previa del anuncio</h3>

                        <div
                            style={{ backgroundImage: `url(${imageUrl})` }}
                            onClick={handleClick}
                            className='w-full h-[200px] object-cover bg-gray-100 my-3 grid 
                            place-items-center cursor-pointer bg-cover bg-no-repeat'>
                            {!imageUrl && "Añadir imagen"}
                        </div>
                        <input
                            onChange={(e: any) => {
                                setImageUrl(URL.createObjectURL(e.target.files[0]));
                                setFormData({ ...formData, photo: e.target.files[0] })
                            }}
                            ref={imageRef}
                            type="file"
                            hidden />

                        <div>

                            {/* aqui van los datos introducidos */}
                            <table>
                                <thead style={{ background: "#8b8498" }}>
                                    <tr>
                                        <td className='p-3 font-bold uppercase bg-gray-100 border border-gray-300 hidden lg:table-cell'>
                                            Formulario
                                        </td>
                                        <td className='p-3 font-bold uppercase bg-gray-100 border border-gray-300 hidden lg:table-cell w-screen'>
                                            Entrada
                                        </td>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'>
                                        <td className='w-full lg:w-auto p-3 text-gray-800 text-center bg-yellow-400 border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Formulario</span>
                                            Título
                                        </td>
                                        <td className='w-full lg:w-auto text-gray-800 border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Entrada</span>
                                            <input
                                                type="text"
                                                className='outline-none w-full border border-gray-300 py-3 text-center'
                                                onChange={(e: any) => setFormData({ ...formData, jobtitle: e.target.value })}
                                                value={formData.jobtitle}
                                            />
                                        </td>
                                    </tr>

                                    <tr className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'>
                                        <td className='w-full lg:w-auto p-3 text-gray-800 text-center bg-yellow-400 border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Formulario</span>
                                            Dedicación
                                        </td>
                                        <td className='w-full lg:w-auto text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Entrada</span>
                                            {/* {<Select
                                                className='outline-none w-full border border-gray-300'
                                                options={options}
                                                onChange={(e: any) => setFormData({ ...formData, jobtype: e.value })}
                                            />} */}
                                            {formData.jobtype}
                                        </td>
                                    </tr>

                                    <tr className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'>
                                        <td className='w-full lg:w-auto p-3 text-gray-800 text-center bg-yellow-400 border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Formulario</span>
                                            Empresa
                                        </td>
                                        <td className='w-full lg:w-auto text-gray-800 border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Entrada</span>
                                            <input
                                                type="text"
                                                className='outline-none w-full border border-gray-300 py-3 text-center'
                                                onChange={(e: any) => setFormData({ ...formData, jobcompany: e.target.value })}
                                                value={formData.jobcompany}
                                            />
                                        </td>
                                    </tr>

                                    <tr className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'>
                                        <td className='w-full lg:w-auto p-3 text-gray-800 text-center bg-yellow-400 border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Formulario</span>
                                            Ubicación
                                        </td>
                                        <td className='w-full lg:w-auto text-gray-800 border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Entrada</span>
                                            <input
                                                type="text"
                                                className='outline-none w-full border border-gray-300 py-3 text-center'
                                                onChange={(e: any) => setFormData({ ...formData, joblocation: e.target.value })}
                                                value={formData.joblocation}
                                            />
                                        </td>
                                    </tr>

                                    <tr className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'>
                                        <td className='w-full lg:w-auto p-3 text-gray-800 text-center bg-yellow-400 border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Formulario</span>
                                            Contacto
                                        </td>
                                        <td className='w-full lg:w-auto text-gray-800 border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Entrada</span>
                                            <input
                                                type="text"
                                                className='outline-none w-full border border-gray-300 py-3 text-center'
                                                onChange={(e: any) => setFormData({ ...formData, jobcontact: e.target.value })}
                                                value={formData.jobcontact}
                                            />
                                        </td>
                                    </tr>

                                    <tr className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'>
                                        <td className='w-full lg:w-auto p-3 text-gray-800 text-center bg-yellow-400 border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Formulario</span>
                                            Sueldo
                                        </td>
                                        <td className='w-full lg:w-auto text-gray-800 border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Entrada</span>
                                            <input
                                                type="text"
                                                className='outline-none w-full border border-gray-300 py-3 text-center'
                                                onChange={(e: any) => setFormData({ ...formData, jobsalary: e.target.value })}
                                                value={formData.jobsalary}
                                            />
                                        </td>
                                    </tr>

                                    <tr className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'>
                                        <td className='w-full lg:w-auto p-3 text-gray-800 text-center bg-yellow-400 border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Formulario</span>
                                            Descripción
                                        </td>
                                        <td className='w-full lg:w-auto text-gray-800 border border-b block lg:table-cell relative lg:static'>
                                            <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>Entrada</span>
                                            <textarea
                                                rows={4}
                                                className='outline-none w-full border border-gray-300 text-center'
                                                onChange={(e: any) => setFormData({ ...formData, jobdescription: e.target.value })}
                                                value={formData.jobdescription}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                        <p className='text-gray-500 pt-4 text'>
                            <span className='font-bold'>Atención:</span> Cualquier cambio aquí afectará la forma en que su entrada aparece
                            en lugares como la página de inicio, así que por favor revise los datos y establezca la etiqueta
                        </p>
                    </div>

                    {/* derecha */}
                    <div className='flex-[1] flex flex-col gap-4 mb-5 md:mb-0'>
                        <h3 className='text-2xl'>
                            Publicando a: <span className='fon-tbold capitalize'>{getUserData?.fullname}</span>
                        </h3>

                        <p>
                            Añade o modifica la etiqueta hasta un máximo de 5 para que los posibles candidatos conozcan de qué trata su oferta. <br />
                            Pulse Intro después de cada categoría

                        </p>

                        <TagsInput value={tags} onChange={setTags} />
                        <button
                            onClick={handleSubmit}
                            className='btn !bg-green-800 !w-fit !text-white !rounded-full'>
                            {loading ? "Publicando..." : "Publicar la oferta"}
                        </button>

                    </div>
                </div>

            </div>

        </section>
    )
}

export default Preview