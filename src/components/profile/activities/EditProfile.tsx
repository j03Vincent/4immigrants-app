import React, { useEffect, useRef, useState } from 'react'
import Modal from '../../../utils/Modal'
import { LiaTimesSolid } from 'react-icons/lia'
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const EditProfile = ({ editModal, setEditModal, getUserData }: any) => {
    const imgRef = useRef<any>(null);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File>();
    const [imgUrl, setImageUrl] = useState("");
    const [form, setForm] = useState({
        userImg: "",
        fullname: "",
        bio: "",
        skills: "",
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
                skills: "",
            })
        }
    }, [getUserData]);

    // actualizar el formulario en la bd
    const saveForm = async () => {
        if (form["fullname"] === "" || form["bio"] === "" || form["skills"] === "") {
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
                        placeholder='nombre y apellidos'
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
                            placeholder='una introducción, algo sobre ti'
                            maxLength={200}
                        />
                        <p className='text-sm text-gray-600 pt-2'>
                            Aparece en tu perfil como resumen personal.&nbsp;
                            {form.bio?.length}/200
                        </p>
                    </section>

                    <section className='pt-[1rem] text-sm'>
                        <label className='pb-3 block' htmlFor="">Habilidades*</label>
                        <input
                            onChange={(e: any) => setForm({ ...form, skills: e.target.value })}
                            value={form.skills}
                            className='p-1 border-b border-black w-full outline-none'
                            type="text"
                            placeholder='p. ej. manejo de idiomas, ganas de aprender, etc'
                            maxLength={100}
                        />
                        <p className='text-sm text-gray-600 pt-2'>
                            Aparece junto a tu introducción, lo pueden leer los demás.&nbsp;
                            {form.skills?.length}/100
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