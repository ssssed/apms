"use client";

import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/shared/ui/avatar";
import { Box } from "~/shared/ui/box";
import { Typography } from "~/shared/ui/typography";

type Props = {
  session: Session | null;
};

export const PersonalInfo = ({ session }: Props) => {
  console.log(session);

  return (
    <Box>
      <Avatar className="w-20 h-20 mx-auto text-center">
        <AvatarFallback>
          {session?.user.firstName.at(0)}
          {session?.user.lastName.at(0)}
        </AvatarFallback>
        <AvatarImage
          src={session?.user.avatar ?? ""}
          alt={session?.user.firstName ?? ""}
        />
      </Avatar>
      <Typography size={"2xl"} weight={"bold"} className="mt-4 text-center">
        {session?.user.firstName} {session?.user.lastName}
      </Typography>
      <Typography view={"blured"} size={"sm"} className="text-center">
        {session?.user.email}
      </Typography>
    </Box>
  );
};
