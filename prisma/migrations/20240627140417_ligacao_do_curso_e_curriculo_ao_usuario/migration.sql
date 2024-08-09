/*
  Warnings:

  - You are about to drop the column `description` on the `course` table. All the data in the column will be lost.
  - You are about to alter the column `file` on the `curriculum` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to drop the `shift` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Curriculum` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[RM]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Curriculum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RM` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `shift` DROP FOREIGN KEY `Shift_courseId_fkey`;

-- AlterTable
ALTER TABLE `course` DROP COLUMN `description`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `curriculum` ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    MODIFY `file` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `RM` INTEGER NOT NULL;

-- DropTable
DROP TABLE `shift`;

-- CreateIndex
CREATE UNIQUE INDEX `Course_user_id_key` ON `Course`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Curriculum_user_id_key` ON `Curriculum`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_email_key` ON `Student`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_phone_key` ON `Student`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_RM_key` ON `Student`(`RM`);

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curriculum` ADD CONSTRAINT `Curriculum_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
