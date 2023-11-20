import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase';

const useSingleFetch = (collectionName: any, id: any, subCol: any) => {
    const [data, setData] = useState<any>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSingleData = () => {
            const postRef = query(collection(db, collectionName, id, subCol));

            onSnapshot(postRef, (snapshot) => {
                setData(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                )
                setLoading(false);
            })
        }

        getSingleData();
    }, [collectionName, id, subCol]);
    return {
        data,
        loading
    }
}

export default useSingleFetch