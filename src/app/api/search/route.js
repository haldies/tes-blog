import { verifyJwt } from "@/lib/jwt";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const authHeader = req.headers.get('authorization');
    const authToken = authHeader?.replace('Bearer ', '');

    if (!authToken || !verifyJwt(authToken)) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    const url = new URL(req.url);
    const search = url.searchParams.get("s");
   
    try {

        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },

                ]
            }
        });
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
       
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
