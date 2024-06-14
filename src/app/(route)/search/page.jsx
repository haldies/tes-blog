"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./searchPage.module.css";
import Search from "@/app/(route)/_components/inputSearch/inputSearch";
import Link from "next/link";
import StripHtmlTags from "@/utils/StripHtmlTags";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const useFetchSearchResults = (query) => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (!query) return;
        setIsLoading(true);
        try {
            const response = await fetch(`/api/search?s=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Terjadi kesalahan saat memuat data:", error.message);
           
        } finally {
            setIsLoading(false);
        }
    }, [query]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { searchResults, isLoading };
};

const SearchPage = () => {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('s') || "";

    const { searchResults, isLoading } = useFetchSearchResults(initialQuery);


    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <Search
                    initialValue={initialQuery}
                />
            </div>
            <div className="grid grid-cols-4 gap-6 mt-6">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {searchResults.length === 0 ? (
                            <p>No results found.</p>
                        ) : (
                            searchResults.map((item) => (
                                <SearchResultItem key={item.id} item={item} />
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

const SearchResultItem = ({ item }) => (
    <div className="space-y-3">
        {item.img && (
            <div className="rounded-md">
                <Image
                    src={item.img}
                    alt=""
                    width={200}
                    height={100}
                    className="bg-cover w-full rounded-md"
                />
            </div>
        )}
        <div className="space-y-2">
            <div className="text-base">
                <span className={styles.date}>{item.createdAt}{" "}</span>
            </div>
            <Link href={`/artikel/${item.slug}`}>
                <h1 className="text-lg">{item.title}</h1>
            </Link>
            <p className="text-sm">
                <StripHtmlTags html={item.decs.substring(0, 100)} />
            </p>
            <div>
                <span className={styles.category}>{item.catSlug} - </span>
                <Link href={`/artikel/${item.slug}`} className={styles.link}>
                    Baca Selengkapnya
                </Link>
            </div>
        </div>
    </div>
);

export default SearchPage;
