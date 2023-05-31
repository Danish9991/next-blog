'use client'

import axios from 'axios';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '../../components/input/input';


interface InitialStateProps {
    email: string,
    password: string
}

const initialState: InitialStateProps = {
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

    }

    return (
        <form className='text-center' onSubmit={handleSubmit}>
            <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
                <Input type='email' name='email' id='email' placeholder='email' value={state.email} onChange={handleChange} />
                <Input type='password' name='password' id='password' placeholder='password' value={state.password} onChange={handleChange} />
                <button type='submit'>Sign In</button>
            </div>

            <div>
                <div>Don't you have an account ? <Link href='/register'>Sign in</Link> </div>
            </div>
        </form>
    )
}

export default page