/*
  Warnings:

  - A unique constraint covering the columns `[hash_token]` on the table `session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "session_hash_token_key" ON "session"("hash_token");
