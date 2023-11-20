import React, { useState } from 'react'
import { User } from '../../context/Context';
import moment from 'moment';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import DropDown from '../../utils/DropDown';
import { Link } from 'react-router-dom';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { toast } from 'react-toastify';

const Request = ({ item: request, offerId }: any) => {
    const [drop, setDrop] = useState(false);
    const [more, setMore] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const { allUsers, currentUser } = User();
    const getUserData = allUsers.find((user: any) => user.id === request?.userId);

    const [editRequest, setEditRequest] = useState("");

    const removeRequest = async () => {
        try {
            const ref = doc(db, "offers", offerId, "requests", request?.id);
            await deleteDoc(ref);
            setDrop(false);
            toast.success("La solicitud ha sido eliminada");

        } catch (error: any) {
            toast.error(error.message);

        }
    };

    const { userId, message, cv, created } = request;

    const editRequestMessage = () => {
        setIsEdit(true);
        setDrop(false);
        setEditRequest(message);
    };

    const handleEdit = async () => {
        setLoading(true);
        try {
            const ref = doc(db, "offers", offerId, "requests", request.id);
            await updateDoc(ref, {
                message: editRequest,
                created: Date.now(),
                userId: currentUser?.uid,
            });
            setEditRequest("");
            setIsEdit(false);
            setDrop(false);
            toast.success("La solicitud ha sido actualizada");
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
                                {currentUser && currentUser?.uid === userId && (
                                    <>
                                        <button
                                            onClick={() => setDrop(!drop)}
                                            className='text-2xl hover:opacity-70'>
                                            <BiDotsHorizontalRounded />
                                        </button>
                                        <DropDown showDrop={drop} setShowDrop={setDrop} size="w-[10rem]">
                                            <Button
                                                click={editRequestMessage}
                                                title="Editar solicitud" />
                                            <Button click={removeRequest} title="Eliminar solicitud" />
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

                    {cv && (
                        <Link to={cv} target="_blank" rel="noopener noreferrer">
                            <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                        </Link>
                    )}
                </>
            ) : (
                <div className='bg-white shadows p-4'>
                    <textarea
                        value={editRequest}
                        onChange={(e) => setEditRequest(e.target.value)}
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

export default Request;

const Button = ({ click, title }: any) => {
    return (
        <button
            onClick={click}
            className='p-2 border:bg-gray-200 text-black/80 w-full text-sm text-left'>
            {title}
        </button>
    )
}