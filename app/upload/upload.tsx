import { PrismaClient } from "@prisma/client/extension";
import { File } from "buffer";

export function upload(file: string | File) {
  const prisma = new PrismaClient();

  function insertCurriculum() {
    prisma.curriculum.create({
      data: {
        file,
      },
    });
  }
}
