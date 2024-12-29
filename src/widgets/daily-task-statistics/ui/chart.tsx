"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/shared/ui/chart";

interface ProjectData {
  projectName: string;
  taskCount: number;
}

interface DailyTasksStatisticsChartProps {
  data: ProjectData[];
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#131317",
  },
} satisfies ChartConfig;

export function DailyTasksStatisticsChart({
  data,
}: DailyTasksStatisticsChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        barCategoryGap={27}
      >
        <XAxis type="number" dataKey="taskCount" hide />
        <YAxis
          dataKey="projectName"
          type="category"
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="taskCount" fill="var(--color-desktop)" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
