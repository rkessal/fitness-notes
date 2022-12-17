/*
  Warnings:

  - The primary key for the `Exercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ExerciseCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Set` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToExerciseCategory" DROP CONSTRAINT "_ExerciseToExerciseCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToExerciseCategory" DROP CONSTRAINT "_ExerciseToExerciseCategory_B_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Exercise_id_seq";

-- AlterTable
ALTER TABLE "ExerciseCategory" DROP CONSTRAINT "ExerciseCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ExerciseCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ExerciseCategory_id_seq";

-- AlterTable
ALTER TABLE "Set" DROP CONSTRAINT "Set_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Set_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Set_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "_ExerciseToExerciseCategory" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseCategory" ADD CONSTRAINT "_ExerciseToExerciseCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseCategory" ADD CONSTRAINT "_ExerciseToExerciseCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ExerciseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
