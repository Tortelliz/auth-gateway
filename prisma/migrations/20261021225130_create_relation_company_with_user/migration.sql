/*
  Warnings:

  - A unique constraint covering the columns `[company_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "company_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_company_id_key" ON "user"("company_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
