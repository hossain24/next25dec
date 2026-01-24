'use client'

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ReadBook() {
    const router = useRouter()
  
        const handleSignout = () => {
            try {
                axios.get('https://node25mar.onrender.com/auth/logout')
                .then(res => console.log(res))
                .then(() => localStorage.removeItem("user"))
                .then(() => router.push('/login'))
            } catch(err) {
                console.log(err)
            }
        }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-4xl font-bold text-white">Welcome to the Read Book Page</h1>
        <br/>
        <button onClick={handleSignout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
           Sign Out
        </button>
      </div>
    </>
  )
}
