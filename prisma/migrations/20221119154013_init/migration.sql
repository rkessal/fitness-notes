/*
  Warnings:

  - You are about to drop the `UserSet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserSet";

-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "reps" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);
