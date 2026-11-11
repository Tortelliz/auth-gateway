/*
  Warnings:

  - Added the required column `email_verification` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "email_verification" BOOLEAN NOT NULL,
ADD COLUMN     "last_email_verification_at" TIMESTAMPTZ;
