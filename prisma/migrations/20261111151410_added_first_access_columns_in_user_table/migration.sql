/*
  Warnings:

  - Added the required column `first_access` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "first_access" BOOLEAN NOT NULL,
ADD COLUMN     "first_access_at" TIMESTAMPTZ;
