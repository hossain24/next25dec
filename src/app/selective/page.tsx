'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

type BookType = {
    _id: string;
    title: string;
    author: string;
    genre: string;
    url: string;
};

export default function Selective() {

const [books, setBooks] = useState<BookType[]>([]);
    
    const fetchData = async () => {
        const response = await axios.get('https://node25mar.onrender.com/books?limit=6')
        setBooks(response.data);
    }
    console.log(books)

    const [state, setState] = useState({
        id: "",
        title: "",
        author: "",
        genre: "",
        url: ""
      });

    useEffect(() => {
        fetchData()
      }, [])

  return (
    <div className="bg-gray-900 py-24 sm:py-32" id='top-books'>
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-2xl font-normal tracking-tight text-pretty text-slate-500 sm:text-4xl font-serif text-center">
            The Books for All Time
          </h2>
          <p className="mt-6 text-lg/8 text-slate-500 italic font-serif text-justify">
            "Explore our all-time favorite books, handpicked for their timeless stories and unforgettable characters. From classic literature to modern masterpieces, these books have left a lasting impact on readers worldwide."
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {books.map((book) => (
            <li key={book._id}>
              <div className="flex items-center gap-x-6">
                <img
                  alt=""
                  src={book.url}
                  className="size-16 rounded-full outline-1 -outline-offset-1 outline-white/10"
                />
                <div>
                  <h3 className="text-base/7 font-semibold tracking-tight text-slate-500">{book.title}</h3>
                  <p className="text-sm/6 font-semibold text-emerald-900">{book.author}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
