"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageLogo from "../../../../../public/logo.png";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
   
    
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            

            if (currentScrollY > 150) {
               
                setIsVisible(false);
            } else {
                
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <header className={`bg-white w-full p-4 fixed transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="container lg:px-28  flex items-center justify-between">
                <div>
                    <Link href="/">
                        <Image src={ImageLogo} width={120} alt="logo goodpets" priority  style={{
                     width: 'auto',
                     height: 'auto',
                  }} />
                    </Link>
                </div>
                <nav className="gap-6 hidden lg:flex">
                    <Link href="/" className="font-bold">Beranda</Link>
                    <Link href="/" className="font-bold">About</Link>
                    <Link href="/" className="font-bold">Chat Dokter</Link>
                    <Link href="/" className="font-bold">Artikel</Link>
                    <Link href="/about" className="font-bold">Petshop</Link>
                </nav>
                <Button href={"/api/auth/signin"}><span className="font-bold">Download</span></Button>
            </div>
        </header>
    );
};

export default Navbar;
