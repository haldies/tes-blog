import { verifyJwt } from "@/lib/jwt";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";





export const PUT = async (req, { params }) => {

    const session = await getServerSession(req);
    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "no authencated!" }, { status: 401 })
        )
    }


    const authHeader = req.headers.get('authorization');
    const authToken = authHeader?.replace('Bearer ', '');

    if (!authToken || !verifyJwt(authToken)) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const id = params.id;
    const int = parseInt(id)
    const body = await req.json();


    try {
        const user = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: body.name,
                email: body.email,
            }
        });

        return new NextResponse(JSON.stringify(user), { status: 200 });

    } catch (err) {
        return new NextResponse(
            JSON.stringify({ message: "Somethin went wrong " }, { status: 500 })
        )
    }
}

export const DELETE = async (req, { params }) => {
    const authHeader = req.headers.get('authorization');
    const authToken = authHeader?.replace('Bearer ', '');

    if (!authToken || !verifyJwt(authToken)) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const { id } = params;

    const int = parseInt(id);

    try {
        const user = await prisma.user.delete({
            where: {
                id: int,
            }
        });
        
        return new NextResponse(JSON.stringify(user), { status: 200 });

    } catch (err) {
        return new NextResponse(
            JSON.stringify({ message: "Somethin went wrong " }, { status: 500 })
        )
    }
}
