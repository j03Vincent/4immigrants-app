import React, { useEffect, useRef, useState } from 'react'
import Modal from '../../../utils/Modal'
import { LiaTimesSolid } from 'react-icons/lia'
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import Select from 'react-select'



const EditProfile = ({ editModal, setEditModal, getUserData }: any) => {
    const imgRef = useRef<any>(null);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File>();
    const [imgUrl, setImageUrl] = useState("");

    interface FormState {
        userImg: string;
        fullname: string;
        bio: string;
        field: { value: string; label: string } | null;
        skills: { value: string; label: string }[] | null;
    }
    const [form, setForm] = useState<FormState>({
        userImg: "",
        fullname: "",
        bio: "",
        field: null,
        skills: null,
    });

    const btnStyle = 'border border-green-600 py-2 px-5 rounded-full text-green-600';

    const openFile = () => {
        imgRef.current.click();
    };

    // comprobar los datos para mostrarlos
    useEffect(() => {
        if (getUserData) {
            setForm(getUserData);
        } else {
            setForm({
                userImg: "",
                fullname: "",
                bio: "",
                field: null,
                skills: null,
            })
        }
    }, [getUserData]);

    // actualizar el formulario en la bd
    const saveForm = async () => {
        if (form["fullname"] === "" || form["bio"] === "" || form["field"] === null) {
            toast.error("Todos los campos son obligatorios");
            return;
        }
        setLoading(true);

        try {
            /* Como hay dos variables en las que el usuario puede seleccionar fotos o dejar lo que tenía antes, 
            hay que establecer dos condiciones. imageFile = File, form.userImg = string */
            if (imageFile) {
                const storageRef = ref(storage, `image/${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                const imageUrl = await getDownloadURL(storageRef);

                const docRef = doc(db, "users", getUserData?.userId);
                await updateDoc(docRef, {
                    userImg: imageUrl,
                    fullname: form.fullname,
                    bio: form.bio,
                    field: form.field,
                    skills: form.skills,
                })
                setLoading(false);
                setEditModal(false);
                toast.success("Perfil actualizado con éxito");

            } else {
                const docRef = doc(db, "users", getUserData?.userId);
                await updateDoc(docRef, {
                    userImg: form.userImg,
                    fullname: form.fullname,
                    bio: form.bio,
                    field: form.field,
                    skills: form.skills,
                })
                setLoading(false);
                setEditModal(false);
                toast.success("Perfil actualizado con éxito");


            }

        } catch (error: any) {
            toast.error(error.message);
        }

    };

    const optionsField = [
        { value: 'Sector hostelería y turismo', label: 'Sector hostelería y turismo (restaurantes, hoteles)' },
        { value: 'Sector doméstico', label: 'Sector doméstico (limpieza, empleado/a de hogar)' },
        { value: 'Sector transporte y logística', label: 'Sector transporte y logística' },
        { value: 'Sector comercio', label: 'Sector comercio (ropas, alimentación, estancos)' },
        { value: 'Sector agricultura y ganadería', label: 'Sector agricultura y ganadería' },
        { value: 'Sector actividades físico-deportivas', label: 'Sector actividades físico-deportivas' },
        { value: 'Sector sanidad', label: 'Sector sanidad (farmacias, hospital, veterinarias)' },
        { value: 'Sector educación', label: 'Sector educación (colegios, academias, educación infantil)' },
        { value: 'Sector construcción e industrias extractivas', label: 'Sector construcción e industrias extractivas' },
        { value: 'Sector de economía e industria digital', label: 'Sector de economía e industria digital (informática, teleco)' },
        { value: 'Sector energía y agua', label: 'Sector energía y agua(fontanero, distribución de energía eléctrica)' },
        { value: 'Sector otros servicios', label: 'Sector otros servicios (peluquería, jardinería' },
    ]

    const optionsSkills = [
        { value: 'Adaptación', label: 'La capacidad de adaptación' },
        { value: 'Equipo', label: 'Trabajar en equipo' },
        { value: 'Tranquilo', label: 'Controlar el estrés' },
        { value: 'Iniciativa', label: 'Tener iniciativa' },
        { value: 'Responsabilidad', label: 'Saber tomar decisiones' },
        { value: 'Racional', label: 'Actuar de manera racional' },
        { value: 'Comunicación', label: 'Capacidad de comunicación (dominio de idiomas)' },
        { value: 'Confianza', label: 'Confianza' },
        { value: 'Flexibilidad', label: 'Flexibilidad' },
        { value: 'Empatía', label: 'Empatía (comprender y respetar)' },
        { value: 'Optimismo', label: 'Optimismo' },
        { value: 'Liderazgo', label: 'Liderazgo' },
    ]

    return (
        <Modal modal={editModal} setModal={setEditModal}>
            <div className='center w-[95%] md:w-[45rem] bg-white mx-auto shadows my-[1rem] z-20 mb-[3rem] p-[2rem]'>

                {/* header */}
                <div className='flex items-center justify-between'>
                    <h2 className='font-bold text-xl'>Datos del perfil</h2>
                    <button onClick={() => setEditModal(false)} className='text-xl'>
                        <LiaTimesSolid />
                    </button>
                </div>

                {/* body */}
                <section className='mt-6'>
                    <p className='pb-3 text-sm text-gray-500'>Foto de perfil</p>
                    <div className='flex gap-[2rem]'>
                        <div className='w-[5rem]'>
                            <img
                                className='min-h-[5rem] min-w-[5rem] object-cover border border-gray-400 rounded-full'
                                src={imgUrl ? imgUrl : form.userImg ? form.userImg : "/default-avatar.png"}
                                alt="profile-img"
                                referrerPolicy="no-referrer"
                            />
                            <input
                                onChange={(e: any) => {
                                    setImageUrl(URL.createObjectURL(e.target.files[0]));
                                    setForm({ ...form, userImg: e.target.files[0] });
                                    setImageFile(e.target.files[0]);
                                }}
                                accept="image/jpg, image/png, image/jpeg"
                                ref={imgRef}
                                type="file"
                                hidden
                            />
                        </div>

                        <div>
                            <div className='flex gap-4 text-sm'>
                                <button onClick={openFile} className='text-green-600'>Actualizar</button>
                                <button className='text-red-600'>Borrar</button>
                            </div>
                            <p className='w-full sm:w-[20rem] text-gray-500 text-sm pt-2'>
                                Formato recomendado: JPG, PNG o GIF cuadrado, al menos 1.000 píxeles por lado
                            </p>
                        </div>

                    </div>
                </section>

                {/* input form */}
                <section className='pt-[1rem] text-sm'>
                    <label className='pb-3 block' htmlFor="">Nombre completo*</label>
                    <input
                        onChange={(e: any) => setForm({ ...form, fullname: e.target.value })}
                        value={form.fullname}
                        className='p-1 border-b border-black w-full outline-none'
                        type="text"
                        placeholder='Nombre y apellidos'
                        maxLength={50}
                    />
                    <p className='text-sm text-gray-600 pt-2'>
                        Aparece en la página de tu perfil, como titular y en tus respuestas.&nbsp;
                        {form.fullname?.length}/50
                    </p>

                    <section className='pt-[1rem] text-sm'>
                        <label className='pb-3 block' htmlFor="">Preséntate*</label>
                        <input
                            onChange={(e: any) => setForm({ ...form, bio: e.target.value })}
                            value={form.bio}
                            className='p-1 border-b border-black w-full outline-none'
                            type="text"
                            placeholder='Una introducción, algo sobre ti'
                            maxLength={200}
                        />
                        <p className='text-sm text-gray-600 pt-2'>
                            Aparece en tu perfil como resumen personal.&nbsp;
                            {form.bio?.length}/200
                        </p>
                    </section>

                    <section className='pt-[1rem] text-sm'>
                        <label className='pb-3 block' htmlFor="">Sector profesional*</label>
                        <Select
                            onChange={(e: any) => setForm({ ...form, field: e })}
                            value={form.field}
                            className='p-1 w-full outline-none'
                            placeholder='¿Cuál es tu sector profesional?'
                            options={optionsField}
                            isSearchable={true}
                            isClearable={true}
                        />
                        <p className='text-sm text-gray-600 pt-2'>
                            Elige el sector al que perteneces. Facilita la creación de redes.&nbsp;
                            {/* {form.skills?.length}/100 */}
                        </p>
                    </section>

                    <section className='pt-[1rem] text-sm'>
                        <label className='pb-3 block' htmlFor="">Habilidades*</label>
                        <Select
                            onChange={(e: any) => setForm({ ...form, skills: e })}
                            value={form.skills}
                            className='p-1 w-full outline-none'
                            placeholder='Selecciona las habilidades en las que destaques'
                            options={optionsSkills}
                            isSearchable={true}
                            isClearable={true}
                            isMulti

                        />
                        <p className='text-sm text-gray-600 pt-2'>
                            Es posible seleccionar varias habilidades. Se mostrarán en "Mis datos".
                            {/* {form.skills?.length}/100 */}
                        </p>
                    </section>
                </section>

                {/* footer */}
                <div className='flex items-center justify-end gap-4 pt-[2rem]'>
                    <button
                        onClick={() => setEditModal(false)}
                        className={btnStyle}>
                        Cancelar
                    </button>
                    <button
                        onClick={saveForm}
                        className={`${btnStyle} bg-green-800 text-white`}>
                        {loading ? "Guardando..." : "Guardar"}
                    </button>
                </div>

            </div>
        </Modal>
    )
}

export default EditProfile