import { verifyJwt } from "@/lib/jwt";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {

    const authHeader = req.headers.get('authorization');
    const authToken = authHeader.replace('Bearer ', '');
    if (!authToken || !verifyJwt(authToken)) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const { slug } = params;

    try {
        const post = await prisma.post.findFirst({
            where: {
                OR: [
                    { slug: slug },
                    { id: slug }
                ],
            },
            include: { user: true }
        });

        if (!post) {
            return new NextResponse(JSON.stringify({ message: "Post not found" }), { status: 404 });
        }
        return new NextResponse(JSON.stringify({ post }), { status: 200 });

    } catch (err) {

        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" }),
            { status: 500 }
        );
    }
};


export const PUT = async (req, { params }) => {
    const { slug } = params;
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

    try {

        const body = await req.json();


        const updatedPost = await prisma.post.update({
            where: {
                id: slug
            },
            data: {
                ...body,
                userEmail: session.user.email,
            }
        });

        return new NextResponse(JSON.stringify({ post: updatedPost }), { status: 200 });

    } catch (err) {

        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" }),
            { status: 500 }
        );
    }
};


export const DELETE = async (req, { params }) => {
    const { slug } = params;

    const session = await getAuthSession()
    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "no authencated!" }, { status: 401 })
        )
    }

    try {
        const updatedPost = await prisma.post.delete({
            where: {
                id: slug
            },

        });

        return new NextResponse(JSON.stringify({ post: updatedPost }), { status: 200 });

    } catch (err) {

        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" }),
            { status: 500 }
        );
    }
};