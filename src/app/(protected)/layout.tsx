import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ROUTER } from "~/shared/lib/router";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session) {
    redirect(ROUTER.pages.AUTH);
  }

  return (
    <main>
      Root layout
      <br />
      <br />
      {children}
    </main>
  );
}