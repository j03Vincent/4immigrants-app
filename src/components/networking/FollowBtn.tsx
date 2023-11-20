import React, { useEffect, useState } from 'react'
import { User } from '../../context/Context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import useSingleFetch from '../hooks/useSingleFetch';
import { useLocation } from 'react-router-dom';

const FollowBtn = ({ userId }: any) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const { currentUser } = User();

    const { data, loading } = useSingleFetch(
        "users",
        currentUser?.uid,
        "following"
    );

    useEffect(() => {
        setIsFollowed(
            data && data?.findIndex((item: any) => item.id === userId) !== -1);

    }, [data, userId])



    const handleFollow = async () => {
        try {
            if (currentUser) {
                const followRef = doc(db, "users", currentUser?.uid, "following", userId); //usuario siguiendo

                const followerRef = doc(db, "users", userId, "followers", currentUser?.uid); //seguidor
                if (isFollowed) {
                    await deleteDoc(followRef);
                    await deleteDoc(followerRef);
                    toast.success("Dejaste de seguir este usuario");
                } else {
                    await setDoc(followRef, {
                        userId: userId,
                    });
                    await setDoc(followerRef, {
                        userId: userId,
                    });
                    toast.success("Has seguido este usuario");
                }
            }

        } catch (error: any) {
            toast.error(error.message);

        }
    }

    const { pathname } = useLocation();

    return (
        <>
            <button
                onClick={handleFollow}
                className={`${pathname === "/user" ? "border border-black" : ""} px-3 py-[0.2rem] rounded-full 
                ${isFollowed ? "text-gray-500 border-none" : ""}`}>
                {isFollowed ? "Siguiendo" : "Seguir"}
            </button>
        </>
    )
}

export default FollowBtn