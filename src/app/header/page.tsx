'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-2">
            <span className="sr-only">Library</span>
            <img
              alt=""
              src="./image/logo/logo.svg"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12 font-serif">
           <Link href="/#books" scroll={true} className="text-sm/6 font-normal text-slate-500">
            Books
          </Link>
            <Link href="/#articles" scroll={true} className="text-sm/6 font-normal text-slate-500">
               Articles
            </Link>
          <Link href="/#news" scroll={true} className="text-sm/6 font-normal text-slate-500">
            News
          </Link>
          <Link href="/#contact" className="text-sm/6 font-normal text-slate-500">
            Contact
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm/6 font-normal text-slate-500 font-serif">
            Log in
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Wisdom</span>
              <img
                alt=""
                src="./image/logo/logo.svg"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-slate-500"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10 font-serif">
              <div className="space-y-2 py-6">
                <a
                  href="/book-three"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-normal text-slate-500 hover:bg-white/5"
                >
                  Books
                </a>
                <a
                  href="/articles"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-normal text-slate-500 hover:bg-white/5"
                >
                  Articles
                </a>
                <a
                  href="/news"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-normal text-slate-500 hover:bg-white/5"
                >
                  News
                </a>
                <a
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-normal text-slate-500 hover:bg-white/5"
                >
                  Contact
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-normal text-slate-500 hover:bg-white/5"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
