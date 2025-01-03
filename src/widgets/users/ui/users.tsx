import { getServerSession } from "next-auth";
import { authOptions } from "~/shared/lib/auth";
import { prisma } from "~/shared/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "~/shared/ui/avatar";
import { Box } from "~/shared/ui/box";
import { Typography } from "~/shared/ui/typography";

export const UsersList = async () => {
  const session = await getServerSession(authOptions);
  const users = await prisma.user.findMany({
    take: 4,
    where: {
      NOT: {
        id: +session!.user.id,
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return (
    <Box className="flex flex-col gap-1 w-[365px] max-h-fit">
      <Typography size={"xl"} weight={"bold"} className="leading-[34px]">
        Новый чат
      </Typography>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div key={user.id} className="flex gap-2 items-center">
            <Avatar>
              <AvatarFallback>
                {user.firstName.at(0)}
                {user.lastName.at(0)}
              </AvatarFallback>
              <AvatarImage src={user.avatar ?? ""} alt={user.firstName ?? ""} />
            </Avatar>
            <div className="flex flex-col">
              <Typography size={"lg"} weight={"bold"}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography view={"blured"} size={"xs"}>
                {user.role}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};
