"use client"

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function page() {

  const [book, setBook] = useState<{title: string; author: string; genre: string; url: string }>({
    title: "",
    author: "",
    genre: "",
    url: ""
  });

  const params = useParams()
  const { _id } = params
  const [books, setBooks] = useState([]);
  const router = useRouter();

   useEffect(() => {
        axios.get('https://node25mar.onrender.com/books')
            .then(response => {
        setBooks(response.data);
        console.log(response.data);
    })
    .catch(error => {
        console.error('There was an error fetching the books!', error);
    })
    }, []);

    useEffect(() => {
      axios.get(`https://node25mar.onrender.com/books/${_id}`)
            .then(response => {
        setBook(response.data);
        console.log(response.data);
    })
    .catch(error => {
        console.error('There was an error fetching the books!', error);
    })
    }, [_id]);


    const goBack = () => {
      router.push('/');
    }

  return (
  <>
        <div className="bg-gray-900">
        <div className="overflow-hidden bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                  <div className="lg:pt-4 lg:pr-8">
                    <div className="lg:max-w-lg">
                      <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-teal-900 sm:text-3xl">
                        {book.title}
                      </p>
                      <p className="mt-4 text-lg/8 text-slate-700">
                        Author: {book.author}
                      </p>
                      <p className="mt-4 text-lg/8 text-slate-700">
                        Genre: {book.genre}
                      </p>
            </div>
            <button onClick={goBack} className="bg-slate-700 text-teal-700 px-4 py-2 rounded-md hover:bg-gray-700 my-4">
              <span>Go Back</span>
            </button>
        </div>
          <img
            alt={book.title}
            src={book.url}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/12 sm:w-228 md:-ml-4 lg:ml-0"
          />
        </div>
       </div>
      </div>
    </div>
  </>
  )}
