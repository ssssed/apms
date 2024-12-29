import { Page } from "~/shared/ui/page";
import { ProtectRoute } from "./protect-router";
import { Sidebar } from "~/widgets/sidebar";
import { Header } from "~/widgets/header";
import { getServerSession } from "next-auth";
import { authOptions } from "~/shared/lib/auth";
import { redirect } from "next/navigation";
import { ROUTER } from "~/shared/lib/router";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) redirect(ROUTER.pages.AUTH);

  return (
    <ProtectRoute session={session}>
      <Page className="grid grid-cols-[212px_1fr] gap-8 bg-neutral-50 min-h-screen">
        <Sidebar />
        <div className="flex flex-col gap-[30px]">
          <Header />
          {children}
        </div>
      </Page>
    </ProtectRoute>
  );
}
