"use server";

import prisma from "@/utils/connect";
import { hash } from "bcrypt";
import { getServerSession } from "next-auth";


export async function registerUser({ name, email, password }) {
    const session = await getServerSession();
    if(!session){
        return new NextResponse(
            JSON.stringify({ message: "no authencated!" }, { status: 401 })
        )
    }
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: "Akun dengan email ini sudah ada." };
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
    return { user: userWithoutPassword };
}
