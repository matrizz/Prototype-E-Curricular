import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.student.findMany();
  return NextResponse.json(users);
}
