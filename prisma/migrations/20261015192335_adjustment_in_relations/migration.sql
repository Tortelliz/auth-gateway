/*
  Warnings:

  - A unique constraint covering the columns `[company_id]` on the table `company_address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "company_address" DROP CONSTRAINT "company_address_company_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "company_address_company_id_key" ON "company_address"("company_id");

-- AddForeignKey
ALTER TABLE "company_address" ADD CONSTRAINT "company_address_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
