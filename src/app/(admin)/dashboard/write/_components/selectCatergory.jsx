"use client"
import React, { useEffect, useState } from 'react';

function SelectCatergory({ onCategoryChange }) {
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`, {
                cache: "no-store",
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
                },
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


    const handleChange = (event) => {
        onCategoryChange(event.target.value);
    };

    return (
        <div className="flex  flex-col">
            <label htmlFor="subjects" className="pt-3 pb-3  font-bold">Pilih category</label>
            <select name="subjects"  onChange={handleChange} className="border p-3 w-44 justify-around">
            <option selected>Pilih kategori</option>
                {data.map((item) => (
                    <option key={item.id} value={item.title}>
                        {item.title}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectCatergory;
