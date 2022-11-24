/*
  Warnings:

  - You are about to drop the `_ExerciseToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseToUser" DROP CONSTRAINT "_ExerciseToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToUser" DROP CONSTRAINT "_ExerciseToUser_B_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ExerciseToUser";

-- CreateTable
CREATE TABLE "_ExercisesAdded" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExercisesAdded_AB_unique" ON "_ExercisesAdded"("A", "B");

-- CreateIndex
CREATE INDEX "_ExercisesAdded_B_index" ON "_ExercisesAdded"("B");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExercisesAdded" ADD CONSTRAINT "_ExercisesAdded_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExercisesAdded" ADD CONSTRAINT "_ExercisesAdded_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
