"use client";
import React, { useEffect, useState } from 'react'
import StripHtmlTags from '@/utils/StripHtmlTags';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AlignLeft, ChevronDown, Ellipsis, Filter } from 'lucide-react';

import { Input } from '@/components/ui/input';
import Image from 'next/image';


function PostsPage() {
    const [data, setData] = useState([]);
    const [showStatusBar, setShowStatusBar] = useState(true)


    const fetchdata = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?limit=10}`, {
                cache: "no-store",
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
                }
            });
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const respond = await res.json();
            const posts = respond.posts;
            setData(posts);

        } catch (error) {
            console.error("Terjadi kesalahan saat memuat data:", error.message);

        }

    }
    useEffect(() => {
        fetchdata();
    }, []);
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
                method: "DELETE",
                cache: "no-store"
            });
            if (!res.ok) {
                throw new Error("Failed to delete data");
            }
            fetchdata();
        } catch (error) {
            console.error("Terjadi kesalahan saat memuat data:", error.message);

        }
    }


    return (
        <div>
            <div className="p-6 md:p-3 mt-14 sm:pl-44 md:pl-72">
                <div className="flex items-center gap-3 py-4 max-w-[700px]">
                    <Input
                        placeholder="Filter post..."
                        className=""
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto gap-3">
                                <Filter size={20} />
                                Filter <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" >
                            <DropdownMenuCheckboxItem>
                                Publish
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showStatusBar}
                                onCheckedChange={setShowStatusBar}
                                className=" text-center"
                            >
                                Draft
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="w-full max-w-[700px]">
                    <div className="flex flex-col mt-6 space-y-3">
                        {data.map((item) => {
                            return (
                                <div
                                    className="flex pb-3 items-center bg-white border-b border-gray-200  md:min-w-[500px]   dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                    key={item.id}
                                >
                                    <a href={`/dashboard/edit/${item.id}`} className="hidden w-[150px] md:flex">
                                        <Image className="object-cover  h-20 md:h-20  " src={item.image} alt="" width={300} height={300} />
                                    </a>
                                    <div className="flex flex-col justify-between pl-3 leading-normal">

                                        <a href={`/dashboard/edit/${item.id}`}
                                            className="mb-1 font-bold  text-[12px] tracking-tight text-gray-900 dark:text-white">{item.title}</a>
                                        <a href={`/dashboard/edit/${item.id}`} className="text-gray-700  text-[10px] dark:text-gray-400 md:pb-3"> <StripHtmlTags html={item.content.substring(0, 50)} /></a>
                                        <div className="flex items-center ">
                                            <span className="text-[10px] pr-1">Published
                                                on</span>
                                            <span className="text-[10px] pr-3"
                                            >{item.publishedAt}</span>
                                            <DropdownMenu >
                                                <DropdownMenuTrigger asChild className="cursor-pointer">
                                                    <Ellipsis color="#b1aaaa" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent >
                                                    <DropdownMenuGroup>
                                                        <a href={`/dashboard/edit/${item.id}`}>
                                                            <DropdownMenuItem>
                                                                <Button variant="danger">Edit</Button>
                                                                <DropdownMenuShortcut></DropdownMenuShortcut>
                                                            </DropdownMenuItem>
                                                        </a>

                                                        <DropdownMenuItem>
                                                            <Button variant="danger" onClick={() => handleDelete(item.id)} >
                                                                Delete
                                                            </Button>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostsPage