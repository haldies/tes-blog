"use client"
import React, { useEffect, useState } from "react";



const MenuCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {

            const response = await fetch('/api/categories', {
                cache: "no-store",
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);

            setLoading(false);
        } catch (err) {
            
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-wrap mt-6 gap-3">

            {categories.map((category) => (
                <span
                    key={category.id}
                    className="flex items-center p-1 text-center  rounded-lg border ">
                    {category.title}
                </span>
            ))}
        </div>
    );
}

export default MenuCategories;
