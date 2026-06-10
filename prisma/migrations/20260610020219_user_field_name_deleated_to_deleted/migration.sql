/*
  Warnings:

  - You are about to drop the column `deleated` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "deleated",
ADD COLUMN     "deleted" BOOLEAN DEFAULT false;
