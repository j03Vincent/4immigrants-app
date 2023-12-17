import React, { useRef, useState } from 'react'
import Modal from '../../utils/Modal'
import { LiaTimesSolid } from 'react-icons/lia';
import { User } from '../../context/Context';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase';
import { FaCheck } from 'react-icons/fa';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import useSingleFetch from '../hooks/useSingleFetch';
import Loading from '../Loading';
import Request from './Request';

const Apply = ({ offerId, userId, showModal, setShowModal }: any) => {
    // const [showModal, setShowModal] = useState(false);
    const { currentUser, allUsers } = User();
    const fileRef = useRef<any>(null);
    const [message, setMessage] = useState("");

    const getUserData = allUsers.find((user: any) => user.id === currentUser?.uid);

    const { data, loading } = useSingleFetch("offers", offerId, "requests");

    const userRequest = data && data?.filter((request: any) => request.userId === getUserData?.userId);

    const [pdfFile, setPdfFile] = useState<File | null>();

    const handleClick = () => {
        fileRef.current.click();

    };
    const handleRequest = async () => {
        try {
            if (message === "") {
                toast.error("Escribe un mensaje");
                return;
            }

            if (pdfFile) {
                const storageRef = ref(storage, `cvs/${pdfFile.name}`);
                await uploadBytes(storageRef, pdfFile);
                const document = await getDownloadURL(storageRef);

                const requestRef = collection(db, "offers", offerId, "requests");
                await addDoc(requestRef, {
                    message: message,
                    cv: document,
                    created: Date.now(),
                    userId: currentUser?.uid,
                });


            } else {
                const requestRef = collection(db, "offers", offerId, "requests");
                await addDoc(requestRef, {
                    message: message,
                    cv: "",
                    created: Date.now(),
                    userId: currentUser?.uid,
                });

            }

            toast.success("Solicitud enviada con éxito");
            setMessage("");
            setPdfFile(null);

        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <Modal modal={showModal} setModal={setShowModal}>
            <section className={`fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadows p-5 
            overflow-y-auto transition-all duration-500 
            ${showModal ? "translate-x-0" : "translate-x-[23rem]"}`}>
                <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-bold'>Solicitudes({data.length})</h3>
                    <button
                        onClick={() => setShowModal(false)}
                        className='text-xl'>
                        <LiaTimesSolid />
                    </button>
                </div>
                {/* formulario de solictud */}
                {currentUser && (
                    <div className='shadows p-3 my-5 overflow-hidden'>
                        <div className='flex items-center gap-2 mb-5'>
                            <img className='w-[2rem] h-[2rem] object-cover rounded-full'
                                src={getUserData?.userImg || "/default-avatar.png"}
                                alt="user-img" />
                            <h3 className='capitalize text-sm'>{getUserData?.fullname}</h3>
                        </div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={currentUser?.uid !== userId ? 'Mensaje de solicitud' : 'Responder mensaje'}
                            className='w-full outline-none resize-none text-sm border px-2 pt-4'
                        ></textarea>

                        {currentUser?.uid !== userId && (
                            <>
                                <p className='mt-1 text-xs text-center'>
                                    El empleador puede consultar tu perfil y,
                                    opcionalmente, puedes adjuntar tu CV.
                                </p>
                                <div className='flex justify-center'>
                                    <button
                                        onClick={handleClick}
                                        className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none text-xs">
                                        Subir un archivo
                                    </button>
                                    {pdfFile && <FaCheck className='text-green-600 mt-3' />}
                                    <input
                                        onChange={(e: any) => setPdfFile(e.target.files[0])}
                                        type="file" accept=".pdf" hidden ref={fileRef}
                                    />
                                </div>
                            </>
                        )}

                        <div className='flex items-center justify-end gap-4 mt-[1rem]'>
                            <button
                                onClick={() => {
                                    setMessage("");
                                    setPdfFile(null);
                                }}
                                className='text-sm'
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleRequest}
                                className='btn !text-xs !bg-green-700 !text-white !rounded-full'
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                )}
                {data && data?.length === 0 && <p>Esta oferta aún no ha recibido ninguna solicitud</p>}
                {data?.length > 0 && userId === getUserData.userId ? (
                    <div className='border-t py-4 mt-8 flex flex-col gap-8'>
                        {data && data.map((item: any, i: any) =>
                            loading ? (
                                <Loading />
                            ) : (
                                <Request item={item} offerId={offerId} key={i} />
                            )
                        )}
                    </div>
                ) : (
                    <div className='border-t py-4 mt-8 flex flex-col gap-8'>
                        {userRequest && userRequest.map((item: any, i: any) =>
                            loading ? (
                                <Loading />
                            ) : (
                                <Request item={item} offerId={offerId} key={i} />
                            )
                        )}
                    </div>

                )}
            </section>
        </Modal>
    )
}

export default Apply