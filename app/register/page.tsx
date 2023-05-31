'use client'

import axios from 'axios';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '../../components/input/input';
import { toast } from 'react-hot-toast'



interface InitialStateProps {
    name: string,
    email: string,
    password: string
}

const initialState: InitialStateProps = {
    name: '',
    email: '',
    password: ''
}

const page = () => {
    const router = useRouter();
    const [state, setState] = useState(initialState);

    /**
     * handleChange function sets the state as per the input name and value
     * @param event 
     */
    const handleChange = (event: any) => {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    /**
     * handleSubmit function will send the request to server with form values
     * @param event 
     */
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!state.email || !state.password || !state.name) {
            toast.success('provide all details')
        }

    }

    return (
        <form className='text-center' onSubmit={handleSubmit}>
            <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
                <Input type='text' name='name' id='name' placeholder='name' value={state.name} onChange={handleChange} />
                <Input type='email' name='email' id='email' placeholder='email' value={state.email} onChange={handleChange} />
                <Input type='password' name='password' id='password' placeholder='password' value={state.password} onChange={handleChange} />
                <input type='submit' value='Sign Up' />
            </div>

            <div>
                <div>Do you have an account ? <Link href='/login'>Sign in</Link> </div>
            </div>
        </form>
    )
}

export default page