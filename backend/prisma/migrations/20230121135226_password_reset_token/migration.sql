-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPasswordTokenToken" TEXT;

-- CreateTable
CREATE TABLE "ResetPasswordToken" (
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetPasswordToken_pkey" PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_resetPasswordTokenToken_fkey" FOREIGN KEY ("resetPasswordTokenToken") REFERENCES "ResetPasswordToken"("token") ON DELETE SET NULL ON UPDATE CASCADE;
