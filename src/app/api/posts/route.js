
import { verifyJwt } from "@/lib/jwt";

import prisma from "@/utils/connect";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const authHeader = req.headers.get('authorization');
    const authToken = authHeader?.replace('Bearer ', '');

    if (!authToken || !verifyJwt(authToken)) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const category = searchParams.get("cat");
    const POST_PER_PAGE = parseInt(searchParams.get("limit")) || 1;
    const status = searchParams.get("status");

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");


    if (POST_PER_PAGE <= 0 || POST_PER_PAGE > 100) {
        return new NextResponse(
            JSON.stringify({ message: "Invalid limit value, it must be between 1 and 100" }),
            { status: 400 }
        );
    }

    const where = {
        ...(category && { categorySlug: category }),
        ...(startDate && endDate && {
            createAt: {
                gte: new Date(startDate),
                lte: new Date(endDate)
            },

        }),
        ...(status && { status })
    };

    const query = {
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        where,
    };

    try {
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({ where: query.where })
        ]);


        return new NextResponse(JSON.stringify({
            page,
            count,
            limit: POST_PER_PAGE,
            category: category || "all",
            startDate: startDate,
            endDate: endDate,
            status: status,
            posts
        }), { status: 200 });
    } catch (err) {

        return new NextResponse(
            JSON.stringify({ message: "server Something went wrong" }),
            { status: 500 }
        );
    }
};


export const POST = async (req) => {
    const session = await getSession(req);
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
        const body = await req.json()
        const post = await prisma.post.create({
            data: { ...body, userEmail: session.user.email },

        });

        return new NextResponse(JSON.stringify(post, { status: 200 }))

    } catch (err) {

        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" }, { status: 500 })
        )

    }
}



