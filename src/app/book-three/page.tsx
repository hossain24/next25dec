'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from './module';
import Link from 'next/link';
import CartTwo from '../cart-two/page';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

type BookType = {
    _id: string;
    id: number;
    title: string;
    author: string;
    genre: string;
    url: string;
    price: number;
};

export default function BookThree() {
    const [books, setBooks] = useState<BookType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(8);
    
    const fetchData = async () => {
        const response = await axios.get('https://node25mar.onrender.com/books')
        setBooks(response.data);
    }
    console.log(books)

    useEffect(() => {
        fetchData()
      }, [])

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook );

    const cartItemsFromLocalStorage =
      JSON.parse(localStorage.getItem("cartItems") || "[]");

    const [cartItems, setCartItems] = useState(cartItemsFromLocalStorage);

    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAddToCart = (book: BookType) => {
    const itemExists = cartItems.find((item: BookType) => item.id === book.id);
      if (itemExists) {
        setCartItems(
          cartItems.map((singleItem: BookType) => {
            return singleItem.id === book.id
              ? { ...itemExists, quantity: itemExists.quantity + 1 }
              : singleItem;
          })
        );
      } else {
        setCartItems([...cartItems, { ...book, quantity: 1 }]);
      }
      console.log(book);
    };

    // Increase item quantity function
    const handleIncrease = (book: BookType) => {
      const itemExists = cartItems.find((item: BookType) => item.id === book.id);
      if (itemExists) {
        setCartItems(
          cartItems.map((singleItem: BookType) =>
            singleItem.id === book.id
              ? { ...itemExists, quantity: itemExists.quantity + 1 }
              : singleItem
          )
        );
      }
    };

    // Decrease item quantity function
    const handleDecrease = (book: BookType) => {
      const selectedItem = cartItems.find((item: BookType) => item.id === book.id);
      if (selectedItem.quantity === 1) {
        setCartItems(
          cartItems.filter((oneItem: BookType) => oneItem._id !== selectedItem._id)
        );
      } else {
        setCartItems(
          cartItems.map((singleItem: BookType) =>
            singleItem.id === book.id
              ? { ...selectedItem, quantity: selectedItem.quantity - 1 }
              : singleItem
          )
        );
      }
    };

    // Remove Item function
    const handleRemoveItem = (book: BookType) => {
      setCartItems(cartItems.filter((oneItem: BookType) => oneItem.id !== book.id));
    };

    console.log("Cart Items: " + JSON.stringify(cartItems));
    
    const [open, setOpen] = useState(true);

  return (
    <>
      <div className="bg-gray-900">
        <button onClick={() => setOpen(true)} className="bg-slate-700 text-teal-700 px-4 py-2 rounded-md hover:bg-gray-700 my-4">
          <span>View Cart</span>
        </button>
      </div>
      <div>
        <BookList books={currentBooks} onAddToCart={handleAddToCart} />
      </div>
      <div className="bg-gray-900">
        <Pagination
          booksPerPage={booksPerPage}
          totalBooks={books.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
    );
};

function BookList({ books, onAddToCart }: { books: BookType[]; onAddToCart: (book: BookType) => void }) {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white"  id="books"></h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {books.map((book) => (
            <div key={book._id} className="group relative">
              <img
                alt={book.title}
                src={book.url}
                className="aspect-square rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-square"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-emerald-900">
                    <Link href={`/book-three/${encodeURIComponent(book._id)}`}>
                      {book.title}
                    </Link>
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-500">{book.author}</p>
              <p className="text-lg text-gray-700">${book.price.toFixed(2)}</p>
              <button onClick={() => onAddToCart(book)} className="bg-slate-700 text-teal-700 px-4 py-2 rounded-md hover:bg-gray-700 my-4">
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
