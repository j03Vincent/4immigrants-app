import { useState } from "react";
import { User } from "../../../context/Context";
import useSingleFetch from "../../hooks/useSingleFetch";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import Loading from "../../Loading";
import Conversation from "./Conversation";


const Contact = ({ userId, showModal, setShowModal }: any) => {
    const { currentUser, allUsers } = User();
    const [message, setMessage] = useState("");
    const { data, loading } = useSingleFetch("users", userId, "messages");
    const getUserData = allUsers.find((user: any) => user.id === currentUser?.uid);

    // const sortedMessages = data.sort((a, b) => b.created - a.created);

    const handleSubmit = async () => {
        try {
            if (message === "") {
                toast.error("Escribe un mensaje");
                return;
            }

            const contactRef = collection(db, "users", userId, "messages");
            await addDoc(contactRef, {
                message: message,

                created: Date.now(),
                from: currentUser?.uid,
            });



            toast.success("Mensaje enviado con éxito");
            setMessage("");


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
                    <h3 className='text-xl font-bold'>Mensajes({data.length})</h3>
                    <button
                        onClick={() => setShowModal(false)}
                        className='text-xl'>
                        <LiaTimesSolid />
                    </button>
                </div>
                {/* formulario de mensaje */}
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
                            placeholder="Escribe tu mensaje"
                            className='w-full outline-none resize-none text-sm border px-2 pt-4'
                        ></textarea>

                        <div className='flex items-center justify-end gap-4 mt-[1rem]'>
                            <button
                                onClick={() => setMessage("")}
                                className='text-sm'
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                className='btn !text-xs !bg-green-700 !text-white !rounded-full'
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                )}
                {data && data?.length === 0 ? (
                    <p>No tienes conversaciones pasadas</p>
                ) : (
                    <div className="border-t py-4 mt-8 flex flex-col gap-8">
                        {data && data.sort((a: any, b: any) => b.created - a.created).map((item: any, i: any) =>
                            loading ? (
                                <Loading />
                            ) : (
                                <Conversation item={item} userId={userId} key={i} />
                            )
                        )}
                    </div>
                )}



            </section>
        </Modal>
    )
}

export default Contact