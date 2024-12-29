"use client";
import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { ROUTER } from "~/shared/lib/router";

export const ProtectRoute = ({
  children,
  session,
}: PropsWithChildren & { session: Session }) => {
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace(ROUTER.pages.AUTH);
    }
  }, [session]);

  return <SessionProvider>{children}</SessionProvider>;
};
