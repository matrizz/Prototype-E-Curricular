import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(req, {params} : {params: {id?: string, owner_id?: string}}) {
    let resume;

    if (params.owner_id) {
        resume = await prisma.curriculum.findMany({
            where: {
                user_id: params.id,
            }        
        })
    }
    else if (params.id) {
        resume = await prisma.curriculum.findMany({
            where: {
                id: params.id
            }
        })
    }
    
    return NextResponse.json(resume)
}