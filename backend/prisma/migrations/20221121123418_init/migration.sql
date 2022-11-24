/*
  Warnings:

  - You are about to drop the column `userId` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_userId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "userId";

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
