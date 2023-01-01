/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `ExerciseCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseToExerciseCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExercisesAdded` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipment` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToExerciseCategory" DROP CONSTRAINT "_ExerciseToExerciseCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToExerciseCategory" DROP CONSTRAINT "_ExerciseToExerciseCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_ExercisesAdded" DROP CONSTRAINT "_ExercisesAdded_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExercisesAdded" DROP CONSTRAINT "_ExercisesAdded_B_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "equipment" TEXT NOT NULL,
ADD COLUMN     "target" TEXT NOT NULL,
ALTER COLUMN "image" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "ExerciseCategory";

-- DropTable
DROP TABLE "_ExerciseToExerciseCategory";

-- DropTable
DROP TABLE "_ExercisesAdded";

-- CreateTable
CREATE TABLE "_ExerciseToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToUser_AB_unique" ON "_ExerciseToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToUser_B_index" ON "_ExerciseToUser"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseToUser" ADD CONSTRAINT "_ExerciseToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToUser" ADD CONSTRAINT "_ExerciseToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
