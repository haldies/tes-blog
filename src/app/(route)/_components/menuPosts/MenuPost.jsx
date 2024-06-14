import Image from "next/image";
import Link from "next/link";
import React from "react";


const getData = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?limit=4`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
            }
        });
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const response = await res.json();
        const data = response.posts;
        return data;
    } catch (error) {
        console.error("Terjadi kesalahan saat memuat data:", error.message);
       
    }
};

const MenuPosts = async () => {
    const posts = await getData();
    return (
        <div className="w-full ">
            {posts?.map(post => (
                <Link href={`/artikel/${post.slug}`} key={post.id} className="flex gap-3">
                    <div className=" w-[130px] ">
                        <Image src={post.image} alt={post.title} priority width={300} height={200} />
                    </div>
                    <div className="mb-6 w-[250px]">
                        <h2 className="font-bold text-[14px]  mb-3 text-[#333333]">{post.title}</h2>
                        <span className="border flex w-[80px] p rounded-sm items-center justify-center text-[#5c5b5b] font-semibold mb-3">{post.categorySlug}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default MenuPosts;
