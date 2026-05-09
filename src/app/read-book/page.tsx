'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';

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
        <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Welcome to the Read Book Page</h1>
        <button
          onClick={handleSignout}
          className="px-4 py-2 mt-4 text-sm font-medium text-white bg-teal-700 rounded hover:bg-slate-700"
        >
          Sign Out
        </button>
      </div>
      </div>
    </>
  )
}
