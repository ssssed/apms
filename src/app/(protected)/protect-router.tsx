"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { ROUTER } from "~/shared/lib/router";

export const ProtectRoute = ({ children }: PropsWithChildren) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.replace(ROUTER.pages.AUTH);
    }
  }, [session.status]);

  return children;
};
