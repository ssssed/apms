-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('BACKLOG', 'IN_PROGRESS', 'TESTING', 'REALISED', 'REJECTED');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "author_id" INTEGER,
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'BACKLOG';

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "project_id" INTEGER,
ALTER COLUMN "endAt" SET DEFAULT (CURRENT_DATE + INTERVAL '14 days');

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
