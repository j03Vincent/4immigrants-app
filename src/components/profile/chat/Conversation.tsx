import { useState } from 'react'
import { User } from '../../../context/Context';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';
import moment from 'moment';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import DropDown from '../../../utils/DropDown';

const Conversation = ({ item: messages, userId }: any) => {
    const [drop, setDrop] = useState(false);
    const [more, setMore] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const { allUsers, currentUser } = User();
    const getUserData = allUsers.find((user: any) => user.id === messages?.from);

    const [editMessage, setEditMessage] = useState("");

    const removeMessage = async () => {
        try {
            const ref = doc(db, "users", userId, "messages", messages?.id);
            await deleteDoc(ref);
            setDrop(false);
            toast.success("El mensaje ha sido eliminado");

        } catch (error: any) {
            toast.error(error.message);

        }
    };

    const { from, message, created } = messages;

    const editRequestMessage = () => {
        setIsEdit(true);
        setDrop(false);
        setEditMessage(message);
    };

    const handleEdit = async () => {
        setLoading(true);
        try {
            const ref = doc(db, "users", userId, "messages", messages.id);
            await updateDoc(ref, {
                message: editMessage,
                created: Date.now(),
                from: currentUser?.uid,
            });
            setEditMessage("");
            setIsEdit(false);
            setDrop(false);
            toast.success("El mensaje ha sido actualizado");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='border-b'>
            {!isEdit ? (
                <>
                    <div className='flex items-center gap-5 pt-[1rem]'>
                        <img
                            className='w-[2rem] h-[2rem] object-cover rounded-full'
                            src={getUserData?.userImg || "default-avatar.png"} alt="user-img"
                        />

                        <div className='flex-1 flex justify-between'>
                            <div>
                                <h2 className='text-sm capitalize'>{getUserData?.fullname}</h2>
                                <p className='text-sm text-gray-400'>{moment(created).fromNow()}</p>
                            </div>

                            <div className='relative'>
                                {currentUser && currentUser?.uid === from && (
                                    <>
                                        <button
                                            onClick={() => setDrop(!drop)}
                                            className='text-2xl hover:opacity-70'>
                                            <BiDotsHorizontalRounded />
                                        </button>
                                        <DropDown showDrop={drop} setShowDrop={setDrop} size="w-[10rem]">
                                            <Button
                                                click={editRequestMessage}
                                                title="Editar mensaje" />
                                            <Button click={removeMessage} title="Eliminar mensaje" />
                                        </DropDown>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                    <p className='py-4 text-sm'>
                        {more ? message : message.substring(0, 100)}
                        {message.length > 100 && (
                            <button
                                className='text-gray-500'
                                onClick={() => setMore(!more)}
                            >
                                {more ? "...menos" : "...más"}
                            </button>
                        )}
                    </p>
                </>
            ) : (
                <div className='bg-white shadows p-4'>
                    <textarea
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                        placeholder='Edite su mensaje'
                        className='w-full resize-none outline-none text-sm'>

                    </textarea>

                    <div className='flex items-center justify-end gap-2'>
                        <button
                            onClick={() => setIsEdit(false)}
                            className='w-fit text-sm'>
                            Cancelar
                        </button>
                        <button
                            onClick={handleEdit}
                            className='btn !text-white !bg-green-700 !rounded-full !text-xs'>
                            {loading ? "Actualizando..." : "Actualizar"}
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Conversation;

const Button = ({ click, title }: any) => {
    return (
        <button
            onClick={click}
            className='p-2 border:bg-gray-200 text-black/80 w-full text-sm text-left'>
            {title}
        </button>
    )
}