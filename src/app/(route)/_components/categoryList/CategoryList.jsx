"use client"
import React, { useEffect, useState } from "react";

import Link from "next/link";


const CategoryList = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`, {
        cache: "no-store",
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
        }
      });
     
      if (!res.ok) {
        throw new Error("Failed");
      }
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("Terjadi kesalahan saat memuat data:", error.message);
      
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="md:container xl:container flex flex-col flex-wrap">
      <div className="border-t border-b  md:flex-row xl:flex-row flex ">
        {data?.map((item) => (
          <span
            className="flex items-center capitalize h-20 gap-6 rounded p-3 fony-semibold text-[#686E76] "
            key={item.id}
          >
            {item.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;