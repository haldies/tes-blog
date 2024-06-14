import { verifyJwt } from "@/lib/jwt";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const authHeader = req.headers.get('authorization');
    const authToken = authHeader?.replace('Bearer ', '');

    if (!authToken || !verifyJwt(authToken)) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    try {
        const users = await prisma.user.findMany()
        const usersWithRoleAsString = users.map(user => ({
            ...user,
            role: user.role.toString(),
        }));

        return new NextResponse(JSON.stringify(usersWithRoleAsString), { status: 200 });

    } catch (err) {
        
        return new NextResponse(
            JSON.stringify({ message: "Somethin went wrong " }, { status: 500 })
        )
    }
};


