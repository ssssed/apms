"use client";
import { SessionProvider } from "next-auth/react";
import { Page } from "~/shared/ui/page";
import { ProtectRoute } from "./protect-router";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ProtectRoute>
        <Page>
          Root layout
          <br />
          <br />
          {children}
        </Page>
      </ProtectRoute>
    </SessionProvider>
  );
}
