/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "end_at" SET DEFAULT (CURRENT_DATE + INTERVAL '14 days');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "dispay_role" TEXT,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "tel" TEXT;
