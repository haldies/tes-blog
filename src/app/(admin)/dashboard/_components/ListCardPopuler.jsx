"use client";

import { Eye, SquarePen } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { format } from 'date-fns';
import Image from 'next/image';


function formatDate(dateString) {
    return format(new Date(dateString), 'MM-dd-yyyy');
}


function ListCardPopuler() {
    const [data, setdata] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?limit=5`,
                {
                    cache: 'no-store',
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
                    }
                })

            const respond = await res.json()
            setdata(respond.posts)
        }

        fetchdata()
    }, [])

    return (
        <>
            {data.map((item) => {
                return (
                    <div className="flex items-center pl-3 pb-3 mb-3 border-b" key={item.id}>
                        <div className="border w-28  mr-3 rounded-md flex items-center justify-center">
                            <Image src={item.image} alt="dekripsi" width={200} height={120} />
                        </div>
                        <div >
                            <h5 className="text-[14px] font-bold  text-gray-600 pr-4 ">{item.title}</h5>
                            <div className="flex pt-3 items-center">
                                <span className="text-[12px] pr-2">{item.createdAt}</span>
                                <span className="flex text-[12px] items-center font-semibold text-gray-400 gap-2" >
                                    <Eye size={20} color="#ababab" />
                                    {item.views} Views
                                    <SquarePen size={18} color="#ababab" />
                                </span>
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </>

    )
}

export default ListCardPopuler