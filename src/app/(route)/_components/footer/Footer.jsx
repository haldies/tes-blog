import React from "react";
import ImageLogo from "../../../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="container pt-12 ">
            <div className="space-y-3 flex flex-col justify-between lg:flex-row">
                <div>
                    <div>
                        <Image src={ImageLogo} alt="logo goodpest" width={200} height={65} priority style={{
                            width: 'auto',
                            height: 'auto',
                        }} />
                    </div>
                    <p className="lg:w-[300px]">
                        Chat lebih dari 1.000 dokter di Aplikasi Goodpets.
                        Respons Cepat, Jawaban Akurat!
                    </p>
                </div>
                <nav className="flex flex-col  space-y-3">
                    <span>Site Map</span>
                    <Link href="/">HomePage</Link>
                    <Link href="/">Artikel</Link>
                    <Link href="/">About</Link>
                    <Link href="/">Contact</Link>
                </nav>
                <div className="flex space-x-3 pt-3 pb-3">
                    <span>Media Sosial</span>
                    <Link href="/">Facebook</Link>
                    <Link href="/">Instagram</Link>
                    <Link href="/">Tiktok</Link>
                    <Link href="/">Youtube</Link>
                </div>
            </div>
            <span > ©Good Pets, 2024. </span>
        </footer>
    );
}

export default Footer;