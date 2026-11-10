-- CreateTable
CREATE TABLE "password_token" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "hash_token" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "revoked_at" TIMESTAMPTZ,

    CONSTRAINT "password_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "password_token_hash_token_key" ON "password_token"("hash_token");

-- CreateIndex
CREATE INDEX "password_token_id_user_id_hash_token_idx" ON "password_token"("id", "user_id", "hash_token");

-- AddForeignKey
ALTER TABLE "password_token" ADD CONSTRAINT "password_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
