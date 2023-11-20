import React, { useState } from 'react'
import Input from '../utils/Input';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setSignReq }: any) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        correo: "",
        contraseña: "",
    })
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (form.correo === "" || form.contraseña === "") {
            toast.error("Todos los campos son obligatorios");
        }
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, form.correo, form.contraseña);
            navigate("/user");
            toast.success("El usuario se ha identificado correctamente");
            setLoading(false);
        } catch (error: any) {
            toast.error(error.message);
            setLoading(false);
        }
    }

    return (
        <div className='size mt-[6rem] text-center'>
            <h2 className='text-3xl'>Inicia sesion con un correo</h2>
            <p className='w-full sm:w-[25rem] mx-auto py-[3rem]'>
                Introduzca la dirección de correo electrónico asociada a su cuenta
                y la contraseña correspondiente para iniciar sesion.
            </p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <Input form={form} setForm={setForm} type="email" title="correo" name="correo electronico" />
                <Input form={form} setForm={setForm} type="password" title="contraseña" name="contraseña" />
                <button className={`px-4 py-1 text-sm rounded-full bg-green-700 
                 hover:bg-green-800 text-white w-fit mx-auto 
                 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
                    Entra
                </button>
            </form>
            <button
                onClick={() => setSignReq("")}
                className='mt-5 text-sm text-green-600 hover:text-green-700 
                flex items-center mx-auto'>
                <MdKeyboardArrowLeft />
                Otras opciones de inicio sesion
            </button>
        </div>
    )
}

export default SignIn