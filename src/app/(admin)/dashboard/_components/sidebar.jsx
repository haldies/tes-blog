"use client"
import { ChevronLeft, LayoutDashboard, LogOut, PenLine, StickyNote, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import ImageLogo from "../../../../../public/logo.png"
import AuthLinks from './AuthLinks'


function Sidebar({ isOpen, handleClick }) {
    
    return (
        <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform md:translate-x-0  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">
                <ul className="space-y-2 font-medium ">
                    <li>
                        <div className="flex justify-end ">
                            <button className="bg-slate-500  rounded-lg hover:bg-slate-400 md:hidden" onClick={handleClick}> <ChevronLeft size={30} color='#ffff' /></button>
                        </div>
                        <div className="flex items-center p-x-4 pb-6 text-gray-900 rounded-lg hover:bg-gray-100 ">
                            <Image src={ImageLogo} alt="" priority />
                        </div>
                    </li>
                    <li>
                        <a href="/dashboard/write" className="flex items-center p-6 border text-gray-900 rounded-lg hover:bg-gray-100 ">
                            <PenLine />
                            <span className="ms-3">New Create</span>
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ">
                            <LayoutDashboard />
                            <span className="ms-3">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/posts" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ">
                            <StickyNote />
                            <span className="flex-1 ms-3 whitespace-nowrap">Posts</span>
                            <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                        </a>
                    </li>
                    <li>
                        <Link href="/dashboard/users" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ">
                            <Users />
                            <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                        </Link>
                    </li>
                </ul>
                <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 ">
                            <span className="ms-3">Documentation</span>
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer gap-3">
                            <LogOut /> <AuthLinks />
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar