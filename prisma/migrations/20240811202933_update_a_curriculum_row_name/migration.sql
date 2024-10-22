/*
  Warnings:

  - You are about to drop the column `file` on the `curriculum` table. All the data in the column will be lost.
  - Added the required column `data` to the `Curriculum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `curriculum` DROP COLUMN `file`,
    ADD COLUMN `data` VARCHAR(191) NOT NULL;
