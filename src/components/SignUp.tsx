import React, { useState } from 'react'
import Input from '../utils/Input';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ setSignReq, setModal }: any) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        nombre_completo: "",
        correo: "",
        contraseña: "",
        confirmar_contraseña: "",
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (form.nombre_completo === "" || form.correo === "" || form.contraseña === "" || form.confirmar_contraseña === "") {
            toast.error("Todos los campos son obligatorios");
        } else if (form.contraseña !== form.confirmar_contraseña) {
            toast.error("Las contraseñas no coinciden");
            return;
        }
        try {
            setLoading(true);
            const { user } = await createUserWithEmailAndPassword(auth, form.correo, form.contraseña);

            const ref = doc(db, "users", user.uid);
            const userDoc = await getDoc(ref);

            if (!userDoc.exists()) {
                await setDoc(ref, {
                    userId: user.uid,
                    fullname: form.nombre_completo,
                    email: form.correo,
                    userImg: "",
                    bio: "",
                    created: Date.now(),
                })

                navigate(`/profile/${user.uid}`);
                toast.success("El usuario se ha registrado correctamente");
                setModal(false);
                setLoading(false);
                toast.success("No te olvides de actualizar tus datos");
            }

        } catch (error: any) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div className='size mt-[6rem] text-center'>
            <h2 className='text-3xl'>Registrate con un correo</h2>
            <p className='w-full sm:w-[25rem] mx-auto py-[3rem]'>
                Introduzca su nombre completo, correo electrónico
                y contraseña para empezar.
            </p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <Input form={form} setForm={setForm} type="text" title="nombre_completo" name="nombre completo" />
                <Input form={form} setForm={setForm} type="email" title="correo" name="correo electronico" />
                <Input form={form} setForm={setForm} type="password" title="contraseña" name="contraseña (>6caracteres)" />
                <Input form={form} setForm={setForm} type="password" title="confirmar_contraseña" name="confirmar contraseña" />
                <button className={`px-4 py-1 text-sm rounded-full bg-green-700 
                 hover:bg-green-800 text-white w-fit mx-auto 
                 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
                    Crear
                </button>
            </form>
            <button
                onClick={() => setSignReq("")}
                className='mt-5 text-sm text-green-600 hover:text-green-700 
            flex items-center mx-auto'>
                <MdKeyboardArrowLeft />
                Otras opciones de registro
            </button>
        </div>
    )
}

export default SignUp