import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import { User } from '../../context/Context';
import FollowBtn from '../networking/FollowBtn';
import moment from 'moment';
import 'moment/locale/es';
import SaveJobs from './actions/SaveJobs';
import Actions from './actions/Actions';
import Like from './actions/Like';
import ShareJobs from './actions/ShareJobs';
import { MdOutlinePhoneIphone, MdOutlineLocationOn, MdOutlineWorkOutline, MdOutlineAccountBalanceWallet, MdOutlineAssuredWorkload } from "react-icons/md";
import Recommended from './Recommended';
import Apply from '../apply/Apply';
import Applicants from './actions/Applicants';



const SingleOffer = () => {
    const { offerId }: any = useParams();
    const [offer, setOffer] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const { currentUser, showModal, setShowModal } = User();
    const navigate = useNavigate();

    const [condition, setCondition] = useState(true);


    useEffect(() => {
        const fetchOffer = async () => {
            setLoading(true);
            try {
                const offerRef = doc(db, "offers", offerId);
                const getOffer = await getDoc(offerRef);

                // obtener todos los datos necesarios (usuario y publicacion)
                if (getOffer.exists()) {
                    const offerData = getOffer.data();
                    if (offerData?.userId) {
                        const userRef = doc(db, "users", offerData?.userId);
                        const getUser = await getDoc(userRef);

                        if (getUser.exists()) {
                            const userData = getUser.data();
                            setOffer({ ...offerData, ...userData, id: offerId })
                        }
                    }
                }
                setLoading(false);

            } catch (error: any) {
                toast.error(error.message);
                setLoading(false);

            }
        }
        fetchOffer();
    }, [offerId, offer?.userId])

    const
        {
            jtitle,
            jtype,
            jcompany,
            jlocation,
            jcontact,
            jsalary,
            jdescription,
            userImg,
            fullname,
            userId,
            offerViews,
            created,
            postImg,
            offerStatus,

        } = offer;

    // No mostrar la opción de inscribirse cuando el usuario es el autor o el estado de la oferta es finalizado
    useEffect(() => {
        if (currentUser?.uid === userId || offerStatus === false) {
            setCondition(false);
            return;
        }

    }, [currentUser?.uid, offerStatus, userId])


    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <section className='w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]'>
                        <span className='flex items-start'>
                            <h2 className='text-4xl font-extrabold capitalize'>{jtitle}</h2>
                            {offerStatus ? (
                                <div className="bg-white border border-green-500 rounded shadow-md ml-1">
                                    <p className="text-green-500 text-center font-semibold px-1 text-xs">Activa</p>
                                </div>
                            ) : (
                                <div className="bg-white border border-red-500 rounded shadow-md ml-1">
                                    <p className="text-red-500 text-center font-semibold px-1 text-xs">Finalizada</p>
                                </div>
                            )}

                        </span>
                        <div className='flex items-center gap-2 py-[2rem]'>
                            <img
                                onClick={() => navigate(`/profile/${userId}`)}
                                className='w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer'
                                src={userImg}
                                alt="user-img"
                            />
                            <div>
                                <div className='capitalize'>
                                    <span>{fullname}</span>
                                    {currentUser?.uid !== userId && <FollowBtn userId={userId} />}

                                </div>
                                <p className='text-sm text-gray-500'>
                                    {offerViews} visitas. {""}
                                    <span>{moment(created).fromNow()}</span>
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center justify-between border-b border-t border-gray-200 py-[0.5rem]'>
                            <div className='flex items-center gap-5'>
                                <Like offerId={offerId} />
                                {currentUser?.uid === userId && <Applicants offerId={offerId} />}
                            </div>
                            <div className='flex items-center pt-2 gap-5'>
                                {offer && <SaveJobs offer={offer} />}
                                <ShareJobs />
                                {currentUser?.uid === offer.userId && <Actions offer={offer} />}

                            </div>
                        </div>

                        <div className='mt-[3rem]'>
                            <img
                                className='w-full h-[400px] object-cover'
                                src={postImg}
                                alt="post-img"
                            />

                            <div className='mt-6 lg:flex justify-between items-start'>

                                <div className='lg:w-2/3 w-full p-3'>
                                    <p className='mb-5 text-xl'>
                                        <span className='font-bold'>Descripción:</span> {jdescription}
                                    </p>

                                </div>

                                <div className='lg:w-1/2 w-full p-3'>
                                    <div className='bg-banner p-5 mb-6 rounded'>
                                        <h3 className='text-xl font-bold mb-5'>Detalles de la oferta</h3>
                                        <hr className='h-[2px] bg-yellow-400 border-0' />
                                        <div className='flex justify-between items-center mt-5'>
                                            <p className='text-indigo-400 font-bold flex justify-start items-center'>
                                                <MdOutlineAssuredWorkload className='mr-2' /> Empresa:
                                            </p>
                                            <p>{jcompany}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-indigo-400 font-bold flex justify-start items-center'>
                                                <MdOutlineWorkOutline className='mr-2' /> Dedicación:
                                            </p>
                                            <p>{jtype}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-2'>
                                            <p className='text-indigo-400 font-bold flex justify-start items-center'>
                                                <MdOutlineAccountBalanceWallet className='mr-2' /> Sueldo:
                                            </p>
                                            <p>{jsalary}</p>
                                        </div>

                                        <h3 className='text-xl font-bold mb-5 mt-8'>Información de contacto</h3>
                                        <hr className='h-[3px] bg-yellow-400 border-0' />
                                        <div className='flex justify-between items-center mt-5'>
                                            <p className='text-indigo-400 font-bold flex justify-start items-center'>
                                                <MdOutlinePhoneIphone className='mr-2' /> Teléfono:
                                            </p>
                                            <p>{jcontact}</p>
                                        </div>
                                        <div className='flex justify-between items-center mt-5'>
                                            <p className='text-indigo-400 font-bold flex justify-start items-center'>
                                                <MdOutlineLocationOn className='mr-2' /> Ubicación:
                                            </p>
                                            <p>{jlocation}</p>
                                        </div>
                                    </div>

                                    {condition && (
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className='btn !bg-green-800 !w-full !text-white !rounded'>
                                            Inscribirme en la oferta
                                        </button>
                                    )}
                                </div>

                            </div>

                        </div>
                    </section>
                    {offer && <Recommended offer={offer} />}
                    {showModal && <Apply offerId={offerId} userId={userId} showModal={showModal} setShowModal={setShowModal} />}
                </>
            )}
        </>

    )
}

export default SingleOffer