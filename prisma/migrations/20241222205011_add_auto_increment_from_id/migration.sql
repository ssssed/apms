-- AlterTable
CREATE SEQUENCE notifications_id_seq;
ALTER TABLE "notifications" ALTER COLUMN "id" SET DEFAULT nextval('notifications_id_seq');
ALTER SEQUENCE notifications_id_seq OWNED BY "notifications"."id";

-- AlterTable
CREATE SEQUENCE projects_id_seq;
ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT nextval('projects_id_seq');
ALTER SEQUENCE projects_id_seq OWNED BY "projects"."id";

-- AlterTable
CREATE SEQUENCE tags_id_seq;
ALTER TABLE "tags" ALTER COLUMN "id" SET DEFAULT nextval('tags_id_seq');
ALTER SEQUENCE tags_id_seq OWNED BY "tags"."id";

-- AlterTable
CREATE SEQUENCE task_comments_id_seq;
ALTER TABLE "task_comments" ALTER COLUMN "id" SET DEFAULT nextval('task_comments_id_seq');
ALTER SEQUENCE task_comments_id_seq OWNED BY "task_comments"."id";

-- AlterTable
CREATE SEQUENCE tasks_id_seq;
ALTER TABLE "tasks" ALTER COLUMN "id" SET DEFAULT nextval('tasks_id_seq');
ALTER SEQUENCE tasks_id_seq OWNED BY "tasks"."id";

-- AlterTable
CREATE SEQUENCE users_id_seq;
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq');
ALTER SEQUENCE users_id_seq OWNED BY "users"."id";
