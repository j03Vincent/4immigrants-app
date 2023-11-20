import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import DropDown from '../../../utils/DropDown';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';
import { User } from '../../../context/Context';

const Actions = ({ offer }: any) => {
    const [showDrop, setShowDrop] = useState(false);
    const handleClick = () => {
        setShowDrop(!showDrop);
    };

    const { currentUser } = User();
    const {
        // jtitle,
        // jtype,
        // jdescription,

        // postImg,
        // created,
        // userId,
        // offerViews,
        id: offerId,

    } = offer;


    const handleRemove = async () => {
        try {
            const ref = doc(db, "offers", offerId);
            const likeRef = doc(db, "offers", offerId, "likes", currentUser?.uid);
            const commentRef = doc(db, "offers", offerId, "requests", currentUser?.uid);
            const saveJobsRef = doc(db, "users", currentUser?.uid, "saveJobs", offerId);

            await deleteDoc(ref);
            await deleteDoc(likeRef);
            await deleteDoc(commentRef);
            await deleteDoc(saveJobsRef);
            toast.success("Oferta eliminada con éxito");
            setShowDrop(false);

        } catch (error: any) {
            toast.error(error.message);
            setShowDrop(false);

        }
    }

    return (
        <div className='relative'>
            <button onClick={handleClick}>
                <BsThreeDots className='text-2xl mt-1' />
            </button>
            <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[7rem]">
                <Button click="" title="Editar oferta" />
                <Button click={handleRemove} title="Eliminar oferta" />
            </DropDown>
        </div>
    )
}

export default Actions;

const Button = ({ click, title }: any) => {
    return (
        <button
            onClick={click}
            className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left  
            ${title === "Eliminar oferta" ? "text-red-600" : ""} `}>
            {title}
        </button>
    );
};