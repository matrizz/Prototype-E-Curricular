import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: true,
  },
};

export function handler(req: NextApiRequest, res: NextApiResponse) {
  const owner = req.body.owner_id;
  const objdata = req.body.data;
  const image = req.body.imageFile;
  req.body

  console.log(req.body)
  const data = {
    data: objdata,
    user_image: image,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      connect: {
        id: owner,
      },
    },
  };

  prisma.curriculum.create({ data }).then(data => console.log(data));

  return NextResponse.json({ msg: "atah" });
}

export async function GET() {
  return NextResponse.json({ msg: "atah" });
}
