import useFetch from '../hooks/useFetch';
import { User } from '../../context/Context';
import useSingleFetch from '../hooks/useSingleFetch';
import { useNavigate } from 'react-router-dom';
import { BsExclamationSquare } from 'react-icons/bs';

const Notification = ({ setModal }: any) => {
    const { currentUser, allUsers, setShowModal } = User();
    const { data } = useFetch("offers");

    /* Conseguir las ofertas publicadas por el usuario 
    para utilizarlas luego en un hook que obtenga la subcolección */
    const userOffer = data && data?.filter((offer: any) => offer.userId === currentUser?.uid);
    const offerIds = userOffer ? userOffer.map((offer: any) => offer.id) : [];

    const { data: requests } = useSingleFetch("offers", "" + offerIds[0] + "", "requests");

    // const fetchAllSubcollections = async () => {
    //     const allRequests = await Promise.all(
    //         offerIds.map(async (offerId: string) => {
    //             // eslint-disable-next-line react-hooks/rules-of-hooks
    //             const { data: requests } = await useSingleFetch("offers", offerId, "requests");
    //             return { offerId, requests };
    //         })
    //     );
    //     console.log(allRequests);
    // };
    // fetchAllSubcollections();

    const getUserData = allUsers.find((user: any) => user.id === requests[0]?.userId);
    console.log(getUserData);
    const navigate = useNavigate();

    return (

        <div className='absolute w-[18rem] p-6 bg-white right-0 top-[100%]
        shadows rounded-md z-50 text-gray-500'>

            <h2 className="text-sm font-semibold">Las notificaciones aparecerán aquí</h2>
            {/* Add your notification content here */}
            {requests && requests.map((item: any, i: any) =>
                <div
                    key={i}
                    className='cursor-pointer flex items-center gap-4 border-b border-gray-300 pb-2 pt-2'
                    onClick={() => {
                        navigate(`/offer/${userOffer[0].id}`);
                        setModal(false);
                        setShowModal(true);
                    }}>
                    <BsExclamationSquare className='text-5xl text-indigo-500' />

                    <p><span className='capitalize'>{getUserData?.fullname}</span> {""}
                        se ha suscrito a tu oferta
                        "<span className='lowercase'>{userOffer[0].jtitle}</span></p>
                </div>
            )}
            {requests.length === 0 && <p>No tienes ninguna notificación</p>}

        </div >
    )
}

export default Notification