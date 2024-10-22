import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const resumes = await prisma.curriculum.findMany();
  return NextResponse.json(resumes);
}
