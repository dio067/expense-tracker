/*
  Warnings:

  - Added the required column `balance` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" INTEGER NOT NULL,
ADD COLUMN     "income" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
