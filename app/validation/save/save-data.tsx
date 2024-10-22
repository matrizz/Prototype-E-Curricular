'use server'

import prisma from "../../lib/prisma";

export const SaveCurriculumData = async (objdata: any, image: any, owner: string) => {

    await prisma.curriculum.create({
        data: {
            data: objdata,
            user_image: image,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: {
                connect: {
                    id: owner
                }
            }
        }
    })
    return { message: 'registro criado com sucesso!', obj: objdata }
}