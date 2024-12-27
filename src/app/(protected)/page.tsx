import { getServerSession } from "next-auth";
import { authOptions } from "~/shared/lib/auth";

export default async function DashboardaPage() {
  const session = await getServerSession(authOptions);

  console.log(session, session?.user.id);

  return <div>Protected Dashboarda Page</div>;
}
