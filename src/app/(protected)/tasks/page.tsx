import { Page } from "~/shared/ui/page";
import { Board } from "~/widgets/board";

export default async function TasksPage() {
  return (
    <Page className="p-0">
      <Board />
    </Page>
  );
}
