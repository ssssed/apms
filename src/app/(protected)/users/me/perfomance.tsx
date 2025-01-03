import { Box } from "~/shared/ui/box";
import { Typography } from "~/shared/ui/typography";
import { moment } from "~/shared/lib/time";
import { getTaskCompletionByMonth } from "~/entities/account";
import { getServerSession } from "next-auth";
import { authOptions } from "~/shared/lib/auth";
import { PerfomanceChart } from "./perfomance-chart";

export const Performance = async () => {
  const session = await getServerSession(authOptions);
  const yearPerfomance = await getTaskCompletionByMonth(+session?.user.id!);
  return (
    <Box>
      <Typography size={"xl"} weight={"bold"} className="leading-[34px]">
        {moment().year()} Показатели
      </Typography>
      <PerfomanceChart perfomance={yearPerfomance} />
    </Box>
  );
};
