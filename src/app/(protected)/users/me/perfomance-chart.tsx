"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/shared/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#000",
  },
} satisfies ChartConfig;

type Props = {
  perfomance: {
    month: string;
    completedTasks: number;
  }[];
};

export const PerfomanceChart = (props: Props) => {
  const { perfomance } = props;
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={perfomance}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="completedTasks"
          type="natural"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  );
};
