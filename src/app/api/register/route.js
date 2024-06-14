import prisma from "@/utils/connect";
import { hash } from "bcrypt";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";




export async function POST(request) {
    const body = await request.json();

    try {

        const session = await getServerSession(request);
        if (!session) {
            return new NextResponse(
                JSON.stringify({ error: "Not authenticated!" }),
                { status: 402 });
          
        }


        const { name, email, password } = body;

        if (!name || !email || !password) {
            return new NextResponse(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 402 });

        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
      

        if (existingUser) {
            return new NextResponse(
                JSON.stringify({ error: "Account with this email already exists." }),
                { status: 400 });
        }

        const hashedPassword = await hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const { password: _, ...userWithoutPassword } = user;
        return new NextResponse(JSON.stringify({ user: userWithoutPassword }));
    } catch (error) {
        console.error('Error in registration handler:', error);
        return new NextResponse(
            JSON.stringify({ error: "Internal server error." }),
            { status: 500 }
        );
    }
}





