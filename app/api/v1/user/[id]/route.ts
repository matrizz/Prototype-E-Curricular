import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(req, {params} : {params: {id?: string}}) {
    let user;

    if (params.id) {
        user = await prisma.student.findMany({
            where: {
                id: params.id
            }
        })
    }
    
    return NextResponse.json(user)
}