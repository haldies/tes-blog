
import React from "react";
import Card from "../card/Card";
import Image from "next/image";
import StripHtmlTags from "@/utils/StripHtmlTags";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const getData = async () => {

   try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?limit=4&status=PUBLISHED`, {
         cache: "no-store",
         headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
         }

      });
      if (!res.ok) {
         throw new Error("Failed to fetch data");
      }
      const response = await res.json();
      const data = response.posts
      return data;
   } catch (error) {
      console.error("Terjadi kesalahan saat memuat data:", error.message);
   }
};
const CardList = async () => {
   const data = await getData()

   return (

      <div className="xl:w-[800px]">
         <div className="pt-6 pb-6">
            <h1 className="text-3xl text-[#3B3738] font-bold">Artikel Kesehatan Terkini untuk Anda</h1>
         </div>
         {data ? (
            <div>
               <figure className="w-full h-auto">
                  <Image src={data[0]?.image} alt="desripsi" width={650} height={650} priority className="w-full  rounded-sm" />
               </figure>
               <h1 className="text-3xl fonr-bold py-6">{data[0]?.title}</h1>
               <p className="text-sm font-semibold line-clamp-2  text-[#836D6E] max-w-[500px]  w-full mb-3">
                  <StripHtmlTags html={data[0]?.content.substring(0, 250)} />
               </p>
               <div className="mb-3">
                  <span className="">{data[0]?.catSlug}</span>
                  <Link href={`/artikel/${data[0]?.slug}`} className=" font-bold text-[#464283]">Baca Selengkapnya</Link>
               </div>
            </div>
         ) : (
            <div className="flex flex-col space-y-6">
               <Skeleton className="h-[250px] w-[650px] rounded-xl" />
               <Skeleton className="h-4 w-[650px]" />
               <div className="space-y-6">
                  <Skeleton className="h-4 w-[400px]" />
                  <Skeleton className="h-4 w-[400px]" />
               </div>
            </div>
         )}
         <div className="flex flex-col gap-3 mt-3 ">
            {data ? (
               data.slice(1).map((item) => {
                  return <Card item={item} key={item.id} />;
               })
            ) : (
               Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="flex space-x-3 items-center flex-row">
                     <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                     <div className="space-y-6">
                        <div className="space-y-3">
                           <Skeleton className="h-6 w-[350px]" />
                           <Skeleton className="h-6 w-[200px]" />
                        </div>
                        <div className="space-y-3">
                           <Skeleton className="h-4 w-[300px]" />
                           <Skeleton className="h-4 w-[200px]" />
                        </div>
                        <Skeleton className="h-6 w-[150px]" />
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   );
};

export default CardList;
