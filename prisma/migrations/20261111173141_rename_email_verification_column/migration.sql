/*
  Warnings:

  - You are about to drop the column `email_verification` on the `user` table. All the data in the column will be lost.
  - Added the required column `must_email_verification` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "email_verification",
ADD COLUMN     "must_email_verification" BOOLEAN NOT NULL;
