import React, { useEffect, useState } from 'react';
import { CiSaveDown2 } from "react-icons/ci";
import { User } from '../../../context/Context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';
import useSingleFetch from '../../hooks/useSingleFetch';

const SaveJobs = ({ offer }: any) => {
    const { currentUser } = User();
    const [isSaved, setIsSaved] = useState(false);
    const { data } = useSingleFetch(
        "users",
        currentUser?.uid, // offer?.id,
        "saveJobs"
    );

    useEffect(() => {
        setIsSaved(data && data?.find((item: any) => item.id === offer?.id));

    }, [data, offer?.id])

    const handleSave = async () => {
        try {
            if (currentUser) {
                const saveRef = doc(db, "users", currentUser?.uid, "saveJobs", offer?.id);

                if (isSaved) {
                    await deleteDoc(saveRef);
                    toast.success("La oferta ya no esta guardada");
                } else {
                    await setDoc(saveRef, {
                        ...offer,
                    });
                    toast.success("La oferta ha sido guardada");
                }
            }

        } catch (error: any) {
            toast.error(error.message)

        }
    };

    return (
        <>
            <button
                onClick={handleSave}
                className='hover:opacity-60'>
                <div className='flex flex-row justify-between items-center'>
                    <CiSaveDown2 className={`text-2xl pointer-event-none 
                    ${isSaved ? "text-yellow-600" : ""}`} />
                    <p className={`px-1 text-sm 
                        ${isSaved ? "text-yellow-600" : "text-gray-600"}`}>
                        {isSaved ? "Guardada" : "Guardar"}
                    </p>
                </div>


            </button>
        </>
    )
}

export default SaveJobs