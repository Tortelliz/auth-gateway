/*
  Warnings:

  - You are about to drop the `password_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Resource" AS ENUM ('forgot_password', 'first_access');

-- DropForeignKey
ALTER TABLE "password_token" DROP CONSTRAINT "password_token_user_id_fkey";

-- DropTable
DROP TABLE "password_token";

-- CreateTable
CREATE TABLE "token" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "hash_token" TEXT NOT NULL,
    "resource" "Resource" NOT NULL,
    "revoked" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "revoked_at" TIMESTAMPTZ,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "token_hash_token_key" ON "token"("hash_token");

-- CreateIndex
CREATE INDEX "token_id_user_id_resource_hash_token_idx" ON "token"("id", "user_id", "resource", "hash_token");

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
