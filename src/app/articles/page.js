'use client'

import Link from 'next/link';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Articles() {

   const [articles, setArticles] = useState([]);
   
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

    const [data, setData] = useState({title: "", post: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };
  
  return (
    <>
      <div className="bg-gray-900 py-24 sm:py-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div id ="articles" className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article._id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="group relative grow">
                  <h3 className="mt-3 text-lg/6 font-semibold text-slate-500 group-hover:text-gray-300">
                    <Link href={`/articles/${encodeURIComponent(article.title)}`}>
                      <span className="absolute inset-0" />
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-slate-700">{article.post}</p>
                </div>
              </article>
            ))}
          </div> 
        </div>
      </div>
    </>
    )
  }