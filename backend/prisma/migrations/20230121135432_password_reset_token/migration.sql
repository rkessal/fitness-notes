/*
  Warnings:

  - You are about to drop the `ResetPasswordToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_resetPasswordTokenToken_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "token" TEXT;

-- DropTable
DROP TABLE "ResetPasswordToken";
