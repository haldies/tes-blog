"use client"

import '../globals.css'

import AuthProvider from '@/providers/AuthProvider'
import { Toaster } from '@/components/ui/toaster'
import Sidebar from './dashboard/_components/sidebar'

import { useState } from 'react'
import { AlignLeft } from 'lucide-react';
import Profil from './dashboard/_components/Profil';


export default function RootLayout({ children }) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = () => {
   
    setIsSidebarOpen(!isSidebarOpen)
};


  return (

    <html>
      <body>
        <Toaster />
        <AuthProvider>
          <div className="flex justify-between">
            <button
              onClick={handleClick}
              type="button"
              className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            >
              <span className="sr-only">Open sidebar</span>
              <AlignLeft />
            </button>
            <div className="flex p-2 mt-2 mx-4 md:mx-12 md:mt-3 md:w-full md:justify-end">
              <Profil />
            </div>
          </div>
          {children}
          <Sidebar isOpen={isSidebarOpen} handleClick={handleClick} />
        </AuthProvider>
      </body>
    </html>

  )
}
