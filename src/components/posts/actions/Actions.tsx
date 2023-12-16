import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import DropDown from '../../../utils/DropDown';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';
import { User } from '../../../context/Context';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Loading';

const Actions = ({ offer }: any) => {
    const [showDrop, setShowDrop] = useState(false);
    const [status, setStatus] = useState(true);
    const [loading, setLoading] = useState(false);
    const { pathname } = useLocation();

    const handleClick = () => {
        setShowDrop(!showDrop);
    };
    const navigate = useNavigate();

    const { currentUser } = User();
    const {
        // jtitle,
        // jtype,
        // jdescription,

        // postImg,
        // created,
        // userId,
        // offerViews,
        offerStatus,
        id: offerId,

    } = offer;

    useEffect(() => {
        setStatus(!offerStatus);
    }, [offerStatus]);


    const handleStatus = async () => {
        // setStatus(!offerStatus);
        try {
            setLoading(true);
            const ref = doc(db, "offers", offerId);
            await updateDoc(ref, {
                offerStatus: status,
            });

            if (pathname === "/user") {
                navigate("/user");
            } else {
                // navigate(`/offer/${offerId}`);
                window.location.reload();
            }
            toast.success("Estado de la oferta cambiado");

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }

    const handleRemove = async () => {
        try {
            setLoading(true);
            const ref = doc(db, "offers", offerId);
            const likeRef = doc(db, "offers", offerId, "likes", currentUser?.uid);
            const requestRef = doc(db, "offers", offerId, "requests", currentUser?.uid);
            const saveJobsRef = doc(db, "users", currentUser?.uid, "saveJobs", offerId);

            await deleteDoc(ref);
            await deleteDoc(likeRef);
            await deleteDoc(requestRef);
            await deleteDoc(saveJobsRef);
            toast.success("Oferta eliminada con éxito");
            navigate("/user");

        } catch (error: any) {
            toast.error(error.message);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='relative'>
            {loading && <Loading />}
            <button onClick={handleClick}>
                <BsThreeDots className='text-2xl mt-1' />
            </button>
            <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[7rem]">
                <Button click={handleStatus} title="Cambiar su estado" />
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