'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookTwo() {

    type Book = {
        id: number;
        title: string;
        genre: string;
    };

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetchData()
      }, [])
    
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/api/books')
            setBooks(response.data);
        }
        console.log(books)

  return (
    <>
       <table className="border-separate border border-gray-400 ...">   
            <thead >
                <tr>
                <th className="border border-gray-300">Title</th>
                <th className="border border-gray-300">Genre</th>
                </tr>
            </thead>
            {books.map(book => (
            <tbody key={book.id}>
                <tr>
                <td className="border border-gray-300">{book.title}</td>
                <td className="border border-gray-300">{book.genre}</td>
                </tr>
            </tbody>
              ) )}
            </table>
    </>
  )
}
