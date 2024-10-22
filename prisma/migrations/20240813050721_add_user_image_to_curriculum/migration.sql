/*
  Warnings:

  - Added the required column `user_image` to the `Curriculum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `curriculum` ADD COLUMN `user_image` LONGBLOB NULL;
