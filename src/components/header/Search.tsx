import { useState } from 'react';
import Modal from '../../utils/Modal'
import { CiSearch } from 'react-icons/ci';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const Search = ({ modal, setModal }: any) => {
    const [search, setSearch] = useState("");
    const { data } = useFetch("offers");

    const searchData = data && data?.filter((offer: any) => offer.jtitle.toLowerCase().includes(search.toLowerCase()));
    const navigate = useNavigate();

    return (
        <Modal modal={modal} setModal={setModal}>
            <div
                className={`absolute sm:relative right-4 left-4 top-[4rem] sm:left-0 sm:top-0
                ${modal ? "visible opacity-100" : "invisible opacity-0 sm:visible sm:opacity-100"} 
                transition-all duration-100`}>
                <div className='flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10'>
                    <span className='text-2xl text-gray-400'>
                        <CiSearch />
                    </span>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='bg-transparent outline-none py-[0.7rem] text-sm w-full'
                        type="text"
                        placeholder='Busca ofertas'
                    />
                    {search !== "" && (
                        <div className='absolute right-0 left-0 top-full bg-white shadow rounded-md'>
                            {searchData.length > 0 ? (
                                <>
                                    {searchData.map((offer: any, i: any) => (
                                        <div
                                            onClick={() => {
                                                navigate(`/offer/${offer?.id}`);
                                                setSearch("");
                                            }}
                                            className='p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer'>
                                            <h2 className='line-clamp-1 capitalize text-sm font-bold'>{offer.jtitle}</h2>
                                            <div className='text-xs text-gray-500 line-clamp-2' >
                                                {offer.jdescription}
                                            </div>
                                        </div>

                                    ))}
                                </>
                            ) : (
                                <p className='text-sm text-gray-500 p-3'>
                                    Ninguna oferta encontrada
                                </p>
                            )}

                        </div>
                    )}
                </div>

            </div>
        </Modal>
    )
}

export default Search