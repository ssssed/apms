import { getServerSession } from "next-auth";
import { authOptions } from "~/shared/lib/auth";
import { Page } from "~/shared/ui/page";
import { DailyTaskStatistics } from "~/widgets/daily-task-statistics";
import { TaskStatistics } from "~/widgets/dashboard-task-statistics";
import { RecentlyProjects } from "~/widgets/recently-projects";
import { UsersList } from "~/widgets/users";

import cl from "./styles.module.css";

export default async function DashboardaPage() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <Page className="flex px-0 gap-7 flex-wrap">
      <div className={cl.container}>
        <TaskStatistics />
        <RecentlyProjects />
      </div>
      <div className={cl.sideContent}>
        <DailyTaskStatistics />
        <UsersList />
      </div>
    </Page>
  );
}
