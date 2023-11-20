import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { auth, db } from '../firebase/firebase';
import Loading from '../components/Loading';
import { collection, onSnapshot, query } from 'firebase/firestore';


const UserContext = createContext<any>(undefined);

const Context = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);
    const [allUsers, setAllUsers] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);

    const [publish, setPublish] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        })

        return () => unsubscribe();
    }, [currentUser]);

    useEffect(() => {
        const getUsers = () => {
            const postRef = query(collection(db, "users"));

            onSnapshot(postRef, (snapshot) => {
                setAllUsers(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                )
                setUserLoading(false);
            })
        }

        getUsers();
    }, []);

    return (
        <UserContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                allUsers,
                userLoading,
                publish,
                setPublish,
                showModal,
                setShowModal,
            }}>
            {loading ? <Loading /> : children}
        </UserContext.Provider>
    );

}

export default Context;

export const User = () => useContext(UserContext);