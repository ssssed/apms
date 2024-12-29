import { SparklesIcon } from "lucide-react";
import { Button } from "~/shared/ui/button";
import { Typography } from "~/shared/ui/typography";

export const CreateNewTask = () => {
  return (
    <Button className="ml-auto" size={"lg"}>
      <SparklesIcon />
      <Typography view={"white"}>Создать новую задачу</Typography>
    </Button>
  );
};
