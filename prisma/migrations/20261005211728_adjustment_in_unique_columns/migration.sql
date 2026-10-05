/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "company_cnpj_key" ON "company"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "company_code_key" ON "company"("code");

-- CreateIndex
CREATE UNIQUE INDEX "role_code_key" ON "role"("code");
