'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

type BookType = {
    _id: string;
    title: string;
    author: string;
    genre: string;
};

export default function BookThree() {

    const [books, setBooks] = useState<BookType[]>([]);
    
    const fetchData = async () => {
        const response = await axios.get('https://node25mar.onrender.com/books')
        setBooks(response.data);
    }
    console.log(books)

    const [state, setState] = useState({
        id: "",
        title: "",
        author: "",
        genre: ""
      });

    useEffect(() => {
        fetchData()
      }, [])

  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white"></h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {books.map((book) => (
            <div key={book._id} className="group relative">
              <img
                alt={book.title}
                src={"./image/books/book-10.jpg"}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-emerald-900">
                    <a href={"#"}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {book.title}
                    </a>
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-500">{book.author}</p>
              <p className="text-sm text-slate-700">{book.genre}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
