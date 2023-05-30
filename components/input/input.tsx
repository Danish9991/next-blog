import React, { ChangeEvent } from 'react'

interface InputProps {
    value: string | number,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    type: string,
    name: string,
    id: string,
    placeholder?: string,
    big?: boolean,
    textarea?: boolean
}

const input: React.FC<InputProps> = ({ value, onChange, type, name, id, placeholder, big, textarea }) => {
    return (
        <input type={type} name={name} id={id} placeholder={placeholder} onChange={onChange}
            className={`w-full p-4 pt-6 font-light bg-white border-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-black ${textarea ? 'w-700px h-500px' : 'w-full'} ${big ? 'w-[400px] pb-[6rem]' : ''}`}
        />
    )
}

export default input