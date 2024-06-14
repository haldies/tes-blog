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
        const categories = await prisma.category.findMany()
        return new NextResponse(JSON.stringify(categories, { status: 200 }));

    } catch (err) {
        
        return new NextResponse(
            JSON.stringify({ message: "Somethin went wrong " }, { status: 500 })
        )
    }
};


export const POST = async (req) => {
    try {
        const body = await req.json();
        const category = await prisma.category.create({
            data: {
                ...body
            }
        });

        return new NextResponse(JSON.stringify(category), { status: 201 }); 
    } catch (error) {

      
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" }), 
            { status: 500 }
        );
    }
};