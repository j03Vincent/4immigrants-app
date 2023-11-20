import React from 'react'
import useFetch from '../hooks/useFetch';
import Loading from '../Loading';
import JobsCard from './JobsCard';

const Jobs = () => {
    const { data, loading } = useFetch("offers");

    return (
        <section className='flex flex-col gap-[2.5rem]'>
            {loading ? (
                <Loading />
            ) : (
                data.map((offer: any, i: any) => <JobsCard offer={offer} key={i} />)
            )}
        </section>
    )
}

export default Jobs