import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Recommended = ({ offer: singlePost }: any) => {
    const { data } = useFetch("offers");
    const [commonTags, setCommonTags] = useState([]);

    useEffect(() => {
        let recommendedOffers: any = [];

        data && data.forEach((offer: any) => {
            if (offer.id === singlePost.id) {
                return;
            }

            const offerTag = offer.tags;
            const commonTags = offerTag.filter((tag: any) =>
                singlePost?.tags?.includes(tag)
            );

            if (commonTags.length > 0) {
                recommendedOffers.push({
                    ...offer,
                    commonTags,
                });
            }
        });
        recommendedOffers.sort((x: any) => Math.round(x) * -0.5);
        const minRecommendation = 4;
        const sliceOffer = recommendedOffers.slice(0, minRecommendation);
        setCommonTags(sliceOffer);
    }, [data, singlePost])

    return (
        <section className='bg-gray-100'>
            <div className='w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]'>
                <h2 className='text-xl font-bold'>Ofertas similares en 4immigrants</h2>
                {commonTags.length < 1 ? (
                    <p>No se han encontrado ofertas similares con con el mismo criterio</p>
                ) : (
                    <div className='grid grid-cols-card gap-[2rem] my-[3rem]'>
                        {commonTags.map((offer: any) => (
                            <Offer offer={offer} key={offer.id} />
                        ))}
                    </div>
                )}
            </div>

        </section>
    );
};

export default Recommended;

const Offer = ({ offer }: any) => {
    const { jtitle, jdescription, created, postImg, id: offerId, userId, offerViews } = offer;
    const { data } = useFetch("users");

    const getUser = data && data.find((user: any) => user?.id === userId);
    const navigate = useNavigate();


    return (
        <div
            onClick={() => navigate(`/offer/${offerId}`)}
            className='w-full cursor-pointer'>
            <img
                className='w-full h-[200px] object-cover'
                src={postImg}
                alt="post-img"
            />
            <div className='flex items-center gap-1 py-3'>
                <img
                    className='w-[2rem] h-[2rem] object-cover rounded-full'
                    src={getUser?.userImg}
                    alt="userImg"
                />
                <h3 className='text-sm capitalize'>{getUser?.fullname}</h3>
            </div>

            <h2 className='font-extrabold leading-5 line-clamp-2'>{jtitle}</h2>
            <div className='line-clamp-2 my-3 text-gray-500 leading-5' >{jdescription}</div>
            <p className='text-sm text-gray-600'>{offerViews} visitas.
                <span className='ml-3'>{moment(created).format("DD MMM")}</span>
            </p>


        </div>
    );

}