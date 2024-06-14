"use client"

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
    const { status } = useSession();

    return (
        <>
            {status === "unauthenticated" ? (
                <Link href="/login" className="sm:p-3 font-semibold ">Login</Link>
            ) : (
                <>
                    <span
                        className=" cursor-pointer font-semibold "
                        onClick={signOut}
                    >
                        Logout</span>
                </>
            )}
          
        </>
    );
}

export default AuthLinks;