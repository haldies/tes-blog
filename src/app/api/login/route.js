
import { signJwtAccessToken } from "@/lib/jwt";
import prisma from "@/utils/connect";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";


export async function POST(request) {

    try {
        const body = await request.json();

        if (!body.email || !body.password) {
            return new NextResponse(
                JSON.stringify({ error: "Email and password are required" }),
                { status: 400 }
            );
        }
    
    
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
    
    
    
        if (user && (await bcrypt.compare(body.password, user.password))) {
            const { password, ...userWithoutPass } = user;
            const accessToken = signJwtAccessToken(userWithoutPass);
            const result = {
                ...userWithoutPass,
                accessToken,
            };
        
            return new NextResponse(JSON.stringify(result));
        }
        }catch (error) {
           
            return new NextResponse(
                JSON.stringify({ error: "Internal server error." }),
                { status: 500 }
            );
        }
    
   
    }