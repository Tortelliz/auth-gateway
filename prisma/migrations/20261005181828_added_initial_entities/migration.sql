/*
  Warnings:

  - Added the required column `active` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `failed_login_attempts` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `must_change_password` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "failed_login_attempts" SMALLINT NOT NULL,
ADD COLUMN     "last_login_at" TIMESTAMPTZ,
ADD COLUMN     "must_change_password" BOOLEAN NOT NULL,
ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "company" (
    "id" UUID NOT NULL,
    "cnpj" CHAR(14) NOT NULL,
    "code" VARCHAR(15) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_address" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "cep" CHAR(8) NOT NULL,
    "street" VARCHAR(150) NOT NULL,
    "neighborhood" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "number" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "company_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL,
    "code" VARCHAR(15) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "company_id_code_idx" ON "company"("id", "code");

-- CreateIndex
CREATE INDEX "company_address_id_company_id_idx" ON "company_address"("id", "company_id");

-- CreateIndex
CREATE INDEX "role_id_code_idx" ON "role"("id", "code");

-- CreateIndex
CREATE INDEX "user_role_id_user_id_role_id_idx" ON "user_role"("id", "user_id", "role_id");

-- CreateIndex
CREATE INDEX "user_id_email_password_idx" ON "user"("id", "email", "password");

-- AddForeignKey
ALTER TABLE "company_address" ADD CONSTRAINT "company_address_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
