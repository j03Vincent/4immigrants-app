import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase';

// custom hook para obtener las publicaciones
const useFetch = (collectionName: any) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = () => {
            const postRef = query(collection(db, collectionName), orderBy("created", "desc"));

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

        getData();
    }, [collectionName]);
    return {
        data,
        loading
    }
}

export default useFetch