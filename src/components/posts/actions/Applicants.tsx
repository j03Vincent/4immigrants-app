import React from 'react'
import { MdOutlineContactMail } from 'react-icons/md'
import useSingleFetch from '../../hooks/useSingleFetch';
import { formatNum } from '../../../utils/Helper';
import { User } from '../../../context/Context';

const Applicants = ({ offerId }: any) => {
    const { data } = useSingleFetch("offers", offerId, "requests");
    const { setShowModal } = User();
    return (
        <button
            onClick={() => setShowModal(true)}
            className='flex items-center gap-1 text-sm'>
            <MdOutlineContactMail className='text-xl' />
            <span>{formatNum(data?.length)}</span>
        </button>
    )
}

export default Applicants