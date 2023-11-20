import React, { useState } from 'react'
import Modal from '../utils/Modal';
import { LiaTimesSolid } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import SignIn from './SignIn';
import SignUp from './SignUp';
import { signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Auth = ({ modal, setModal }: any) => {
    const [createUser, setCreateUser] = useState(false);
    const [signReq, setSignReq] = useState("");
    const navigate = useNavigate();

    const googleAuth = async () => {
        try {
            const createUser = await signInWithPopup(auth, provider);
            const newUser = createUser.user;

            const ref = doc(db, "users", newUser.uid);
            const userDoc = await getDoc(ref);

            if (!userDoc.exists()) {
                await setDoc(ref, {
                    userId: newUser.uid,
                    fullname: newUser.displayName,
                    email: newUser.email,
                    userImg: newUser.photoURL,
                    bio: "",
                    experience: "",
                })
                navigate("/");
                toast.success("Se ha identificado correctamente");
                setModal(false);

            }
        } catch (error: any) {
            toast.error(error.message);

        }
    }

    return <Modal modal={modal} setModal={setModal}>
        <section
            className={`z-50 fixed top-0 bottom-0 left-0 md:left-[10rem] 
            overflow-auto right-0 md:right-[10rem] bg-white shadows transition-all duration-500 
            ${modal ? "visible opacity-100" : "invisible opacity-0"}`}>
            <button
                onClick={() => setModal(false)}
                className='absolute top-8 right-8 text-2xl over:opacy-50'>
                <LiaTimesSolid />
            </button>
            <div className='flex flex-col justify-center items-center gap-[3rem]'>
                {signReq === "" ? (
                    <>
                        <h2 className='text-2xl pt-[5rem]'>{createUser ? "Crea una cuenta" : "Bienvenido de vuelta"}</h2>
                        <div className='flex flex-col gap-2 w-fit mx-auto'>
                            <Button
                                click={googleAuth}
                                icon={<FcGoogle className='text-xl' />}
                                text={`${createUser ? "Regisrate" : "Inicia Sesion"} con Google`} />

                            <Button icon={<MdFacebook className='text-xl text-blue-600' />}
                                text={`${createUser ? "Regisrate" : "Inicia Sesion"} con Facebook`} />

                            <Button
                                click={() => setSignReq(createUser ? "sign-up" : "sign-in")}
                                icon={<AiOutlineMail className='text-xl' />}
                                text={`${createUser ? "Regisrate" : "Inicia Sesion"} con un Correo`} />
                        </div>
                        <p>
                            {createUser ? "¿Ya tienes una cuenta?" : "¿Aún no tienes cuenta?"}
                            <button
                                onClick={() => setCreateUser(!createUser)}
                                className='text-green-600 hover:text-green-700 font-bold ml-1'>
                                {createUser ? "Inicia Sesion" : "Registrate"}
                            </button>
                        </p>
                    </>
                ) : signReq === "sign-in" ? (
                    <SignIn setModal={setModal} setSignReq={setSignReq} />
                ) : signReq === "sign-up" ? (
                    <SignUp setModal={setModal} setSignReq={setSignReq} />
                ) : null}
                <p className='md:w-[30rem] mx-auto text-center text-sm mb-[3rem]'>
                    *Al registrarse, usted reconoce haber aceptado los Terminos de Condiciones de 4Immigrants
                    y entiende que se le aplica la Política de Privacidad establecida por la misma.
                </p>
            </div>
        </section>
    </Modal>;

};

export default Auth;

const Button = ({ icon, text, click }: any) => {
    return (
        <button
            onClick={click}
            className='flex items-center gap-10 sm:w-[20rem] border border-black 
        px-3 py-2 rounded-full'>
            {icon} {text}
        </button>
    )
}
