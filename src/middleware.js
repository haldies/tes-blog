import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    if (isDashboard && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", req.url));
    }


    return NextResponse.next();
}
