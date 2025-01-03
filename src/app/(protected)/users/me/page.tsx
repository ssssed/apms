import { Page } from "~/shared/ui/page";
import { Typography } from "~/shared/ui/typography";

import cl from "./styles.module.css";
import { Box } from "~/shared/ui/box";
import { getServerSession } from "next-auth";
import { authOptions } from "~/shared/lib/auth";
import { PersonalInfo } from "./personal-info";
import { Performance } from "./perfomance";
import { EditAccountForm } from "~/features/edit-acocunt";

export default async function MyProfilePage() {
  const session = await getServerSession(authOptions);
  return (
    <Page>
      <Typography weight={"bold"} className="text-[32px] leading-9">
        Аккаунт
      </Typography>
      <section className={cl.section}>
        <aside className="flex flex-col gap-[18px]">
          <PersonalInfo session={session} />
          <Performance />
        </aside>
        <Box className="flex flex-col gap-8">
          <Typography className="leading-[34px]" weight={"bold"} size={"xl"}>
            Настройки профиля
          </Typography>
          <EditAccountForm
            account={{
              id: session?.user.id!,
              displayRole: session?.user.displayRole!,
              firstName: session?.user.firstName!,
              lastName: session?.user.lastName!,
              tel: session?.user.tel!,
            }}
          />
        </Box>
      </section>
    </Page>
  );
}
