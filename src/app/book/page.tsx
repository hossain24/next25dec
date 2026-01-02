'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import './popup.css';
import Link from 'next/link';

type BookType = {
    _id: string;
    title: string;
    author: string;
    genre: string;
};

export default function Book() {
    const [books, setBooks] = useState<BookType[]>([]);
    
    const fetchData = async () => {
        const response = await axios.get('http://localhost:5000/books')
        setBooks(response.data);
    }
    console.log(books)

    const [state, setState] = useState({
        id: "",
        title: "",
        author: "",
        genre: ""
      });
    
      const handleChange = (e:any) => {
        const value = e.target.value;
        setState({
          ...state,
          [e.target.name]: value
        });
      };
    
      const handleSubmit = (e:any) => {
        e.preventDefault();
        const bookData = {
          id: state.id,
          title: state.title,
          author: state.author,
          genre: state.genre
        };
        axios.post("http://localhost:5000/books/add", bookData).then((response) => {
          console.log(response.status, response.data);
        });
      };
    
      useEffect(() => {
        fetchData()
      }, [])

    function openForm() {
        const form = document.getElementById("myForm");
        if (form) {
            form.style.display = "block";
        }
    }
        
    function closeForm() {
        const form = document.getElementById("myForm");
        if (form) {
            form.style.display = "none";
        }
    }    

  return (
    <>
    <div className='bg-gray-900'>
        <div className="grid md:grid-cols-6 justify-center">
            {books.map(book => (
                <div key={book._id} className='p-5'>
                    <div className="w-60 h-80 bg-slate-900 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
                    <div className="w-52 h-40 bg-neutral-900 rounded-2xl">
                        <img src="./image/books/book-2.jpg" alt="Book Cover" className="w-full h-full object-fill rounded-2xl"/>
                    </div>
                    <div>
                        <a>
                          <p className=""><Link href={`/blogs/${encodeURIComponent(book._id)}`}>{book.title}</Link></p>
                        </a>
                        <p className="">{book.author}</p>
                        <p className="">{book.genre}</p>
                    </div>
                    </div>
                </div>
            ))}
            <div className='p-5'>
             <div className="bg-gray-900 w-60 h-80 rounded-3xl text-neutral-300 p-17 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow" >
            <button onClick={openForm} className="group cursor-pointer outline-none hover:rotate-90 duration-300" title="Add New">
        <svg
            className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 
            group-active:fill-teal-600 group-active:duration-0 duration-300"
            viewBox="0 0 24 24"
            height="100px"
            width="100px"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            strokeWidth="1.5"
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            ></path>
            <path strokeWidth="1.5" d="M8 12H16"></path>
            <path strokeWidth="1.5" d="M12 16V8"></path>
        </svg>
        </button>
        </div>
        </div>
        </div>
       

        <div className="form-popup" id="myForm">
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Book</h1>
            <label htmlFor="id"><b>ID</b></label>
            <input type="number" placeholder="Enter ID" name="id" required value={state.id}
                    onChange={handleChange} />

            <label htmlFor="title"><b>Title</b></label>
            <input type="text" placeholder="Enter Title" name="title" required value={state.title}
                    onChange={handleChange} />

            <label htmlFor="author"><b>Author</b></label>
            <input type="text" placeholder="Enter Author" name="author" required value={state.author}
                    onChange={handleChange} />

            <button type="submit" className="btn">Add</button>
            <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
        </form>
        </div>

    </div>
    </>
  )
}