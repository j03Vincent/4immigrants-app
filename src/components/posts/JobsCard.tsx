import moment from 'moment';
import SaveJobs from './actions/SaveJobs';
import { User } from '../../context/Context';
import useFetch from '../hooks/useFetch';
import Loading from '../Loading';
import Actions from './actions/Actions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const JobsCard = ({ offer }: any) => {
    const {
        jtitle,
        jtype,
        jdescription,

        postImg,
        created,
        userId,
        offerViews,
        id: offerId,

    } = offer;

    const { currentUser } = User();

    const { data, loading } = useFetch("users");
    const getUserData = data && data?.find((user: any) => user?.id === userId);

    const navigate = useNavigate();

    const checkAccess = () => {
        if (currentUser) {
            navigate(`/offer/${offerId}`)
        } else {
            toast.error("Inicia sesión o regístrate para ver el contenido de esta oferta");
            return;
        }
    }

    return (
        <section>
            <div
                onClick={checkAccess}
                className='flex flex-col sm:flex-row gap-4 cursor-pointer'>
                {loading && <Loading />}
                <div className='flex-[2.5]'>
                    <p className='pb-2 font-semibold capitalize'>
                        {getUserData?.fullname}
                    </p>
                    <h2 className='text-xl font-bold line-clamp-2 leading-6'>
                        {jtitle}
                    </h2>
                    <h4 className='line-clamp-2 leading-6'>
                        {jtype}
                    </h4>
                    <div className='py-1 text-gray-500 line-clamp-2 leading-5'>
                        {jdescription}
                    </div>

                </div>

                <div className='flex-[1]'>
                    <img src={postImg} alt="postImg" className='w-[53rem]' />
                </div>
            </div>

            <div className='flex items-center justify-between w-full md:w-[70%] mt-[2rem] md:mt-0'>
                <p className='text-xs text-gray-600'>{offerViews} visitas. {moment(created).format("DD MMM")}</p>

                <div className='flex items-center gap-3'>
                    {currentUser && <SaveJobs offer={offer} getUserData={getUserData} />}
                    {currentUser?.uid === userId && <Actions offer={offer} />}
                </div>
            </div>
        </section>
    )
}

export default JobsCard