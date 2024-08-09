import prisma from "@/app/lib/prisma";
import { NextApiHandler, NextApiRequest } from "next";
import { NextResponse } from "next/server";


const createUser = async (params: any) => {
  prisma.$connect();
  await prisma.student.create({
    data: params,
  });
  prisma.$disconnect();
};

export async function handler(req: NextApiRequest, res: NextResponse) {
  return NextResponse.json(req)
  // const o = await createUser({
  //       id: crypto.randomUUID(),
  //       name: req.body["name"],
  //       email: req.body["email"],
  //       phone: req.body["phone"],
  //       RM: req.body["RM"],
  //       image: req.body["image"],
  //       address: req.body["adress"],
  //       birth: new Date(req.body["birth"]),
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     })

  //     res.send(o)
}
