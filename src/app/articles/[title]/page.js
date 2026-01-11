"use client"

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function Page() {

  const [article, setArticle] = useState("");
  const params = useParams()
  const { title } = params
  const [articles, setArticles] = useState([]);
  const router = useRouter();

   useEffect(() => {
        axios.get('https://node25mar.onrender.com/articles')
            .then(response => {
        setArticles(response.data);
        console.log(response.data);
    })
    .catch(error => {
        console.error('There was an error fetching the posts!', error);
    })
    }, []);

    useEffect(() => {
      axios.get(`https://node25mar.onrender.com/articles/${title}`)
            .then(response => {
        setArticle(response.data);
        console.log(response.data);
    })
    .catch(error => {
        console.error('There was an error fetching the article!', error);
    })
    }, [title]);    

    const goBack = () => {
      router.push('/') && window.location.reload(true);
    }

  return (
  <>
        <div className="bg-gray-900">
        <div className="overflow-hidden bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                  <div className="lg:pt-4 lg:pr-8">
                    <div className="lg:max-w-lg">
                      <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-teal-900 sm:text-5xl">
                        {article.title}
                      </p>
                      <p className="mt-6 text-lg/8 text-teal-900">
                        {article.post}
                      </p>
            </div>

        <button onClick={goBack} className="bg-teal-900 text-teal-700 px-4 py-2 rounded-md hover:bg-gray-700">
          <span>Go Back</span>
        </button>
        </div>
          <img
            alt="book image"
            src="../image/books/book-4.jpg"
            className="max-w-2xl rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:ml-0"
          />
        </div>
       </div>
      </div>
    </div>
  </>
  )}
