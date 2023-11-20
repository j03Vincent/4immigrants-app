import React, { useEffect, useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { User } from '../../../context/Context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';
import useSingleFetch from '../../hooks/useSingleFetch';
import { formatNum } from '../../../utils/Helper';


const Like = ({ offerId }: any) => {
    const { currentUser } = User();
    const [liked, setLiked] = useState(false);

    const { data } = useSingleFetch("offers", offerId, "likes");

    useEffect(() => {
        setLiked(data && data.findIndex((item: any) => item.id === currentUser?.uid) !== -1);

    }, [currentUser?.uid, data])

    const handleLike = async () => {
        try {
            if (currentUser) {
                const likeRef = doc(db, "offers", offerId, "likes", currentUser?.uid);
                if (liked) {
                    await deleteDoc(likeRef);
                } else {
                    await setDoc(likeRef, {
                        userId: currentUser?.uid,
                    })
                }
            }
        } catch (error: any) {
            toast.error(error.message);

        }

    }
    return (
        <button
            onClick={handleLike}
            className='flex items-center gap-1 text-sm'>
            <AiOutlineLike className={`text-xl ${liked ? "text-blue-500" : "text-gray-500"}`} />
            <span>{formatNum(data?.length)}</span>

        </button>
    )
}

export default Like