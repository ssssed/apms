/*
  Warnings:

  - You are about to drop the column `createAt` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `endAt` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "createAt",
DROP COLUMN "endAt",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_at" TIMESTAMP(3) NOT NULL DEFAULT (CURRENT_DATE + INTERVAL '14 days'),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
