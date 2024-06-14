"use client";

import React, { useState, useEffect } from 'react';

const TotalPostingan = () => {
  const [totalPost, setTotalPost] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/`, { cache: 'no-store' ,
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
       }
      });
      const data = await res.json();
      setTotalPost(data.count);
    };

    fetchData();
  }, []);

  return <>{totalPost}</>;
};

export default TotalPostingan;