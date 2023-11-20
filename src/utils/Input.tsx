import React from 'react'

const Input = ({ type, title, name, form, setForm }: any) => {
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className='flex flex-col gap-2'>
            <label className='text-sm capitalize'>{name}</label>
            <input
                className='text-center border-b border-black outline-none'
                type={type}
                name={title}
                onChange={handleChange}
            />
        </div>
    )
}

export default Input