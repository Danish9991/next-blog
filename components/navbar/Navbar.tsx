'use client';

import { safeUser } from "@/types/type";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface userMenuProps {
    currentUser : safeUser | null
}

const Navbar : React.FC<userMenuProps> = ({ currentUser }) => {
  return (
    <header>
         <nav className='bg-gray-200 flex justify-between px-4 py-6 shadow-xl'>
            <div>{currentUser?.name}</div>

            <div className='flex gap-4'>
            <Link href='/'>Home</Link>
            <Link href={currentUser ? '/create' : '/register'}>Create</Link>
            {currentUser ? <button onClick={() => signOut()}>Sign out</button> : <Link href='/register'>Register</Link>}
            </div>
        </nav>
    </header>
  )
}

export default Navbar