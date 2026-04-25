'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { Pagination } from './module'
import Link from 'next/link'

type BookType = {
    _id: string;
    id: number;
    title: string;
    author: string;
    genre: string;
    url: string;
    price: number;
    quantity: number;
};

export default function Cart() {

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

    const [cartItems, setCartItems] = useState<BookType[]>([]);
    const [isCartLoaded, setIsCartLoaded] = useState(false);

    const [book, setBook] = useState<{_id: string; id: number; title: string; author: string; genre: string; url: string; price: number; quantity: number }>({
    _id: "",
    id: 0,
    title: "",
    author: "",
    genre: "",
    url: "",
    price: 0,
    quantity: 0
  });

    useEffect(() => {
      const storedCartItems = localStorage.getItem("cartItems");
      setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
      setIsCartLoaded(true);
    }, []);

    useEffect(() => {
      if (isCartLoaded) {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }
    }, [cartItems, isCartLoaded]);

    const handleAddToCart = (book: BookType) => {

     const itemExists = cartItems.find((item: BookType) => item.id === book.id);
      if (itemExists) {
        setCartItems(
          cartItems.map((singleItem: BookType) => {
            return singleItem.id === book.id
              ? { ...itemExists, quantity: itemExists.quantity + 1 }
              : singleItem;
          })
        )
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
      if (!selectedItem) {
        return;
      }

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

    console.log("Cart Items: " + JSON.stringify(cartItems.map((item: BookType) => item.id)));

    const cartTotal = (cartItems: BookType[]) => {
      return cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    };

    console.log(`Total: €${cartTotal(cartItems).toFixed(2)}`);

    const createCheckoutSession = () => {
      axios.post(`https://node25mar.onrender.com/checkout`, {
        books: [
          ...cartItems.map((book: BookType) => ({ id: book.id, quantity: book.quantity }))
        ],
    })
      .then(({ data }) => {
        window.location = data.url
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  return (
    <>
      <div className="bg-gray-900">
        <BookList books={currentBooks} onAddToCart={handleAddToCart} />
        <div className="py-8">
          <Pagination
            booksPerPage={booksPerPage}
            totalBooks={books.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
        />
        </div>
      </div>
    </>
    );

  function BookList({ books, onAddToCart }: { books: BookType[]; onAddToCart: (book: BookType) => void }) {

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-900 bg-cover">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Wisdom</span>
            <img
              alt=""
              src="./image/logo/logo.svg"
              className="h-8 w-auto"
            />
          </Link>
          </div>
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
                      <Link href={`/cart/${encodeURIComponent(book._id)}`}>
                        {book.title}
                      </Link>
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="text-lg text-gray-700">€{book.price.toFixed(2)}</p>
                <button onClick={() => onAddToCart(book)} className="bg-slate-700 text-teal-700 px-4 py-2 rounded-md hover:bg-slate-900 my-4">
                  <span>Add to Cart</span>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-center py-2'>
          <button
              onClick={() => setOpen(true)}
              className="flex justify-center rounded-md bg-slate-700 px-2.5 py-1.5 text-sm  text-teal-700 hover:bg-slate-900"
            >
              View Cart
          </button>
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(true)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-white/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartItems.map((cartItem: BookType) => (
                            <li key={cartItem.id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img alt={cartItem.title} src={cartItem.url} className="size-full object-cover" />
                              </div>
                              
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={cartItem.url}>{cartItem.title}</a>
                                    </h3>
                                    <p className="ml-4">€{cartItem.price.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <span onClick={() => handleIncrease(cartItem)} className="cursor-pointer px-2 text-emerald-900">+</span>
                                    <span onClick={() => handleDecrease(cartItem)} className="cursor-pointer px-2 text-emerald-900">-</span>
                                  </div>
                                  </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty: {cartItem.quantity}</p>
                                  <div className="flex">
                                    <button onClick={() => handleRemoveItem(cartItem)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>  
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>€{cartTotal(cartItems).toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <button onClick={createCheckoutSession} className="flex w-full items-center justify-center rounded-md border border-transparent bg-slate-700 px-6 py-3 text-base font-medium text-teal-700 shadow-sm hover:bg-slate-900">
                        Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={() => setOpen(true)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )}
}
