"use client";
import { SessionProvider } from "next-auth/react";
import { Page } from "~/shared/ui/page";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Page>
        Root layout
        <br />
        <br />
        {children}
      </Page>
    </SessionProvider>
  );
}
