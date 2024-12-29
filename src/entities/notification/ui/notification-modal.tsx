import { BellIcon } from "lucide-react";
import { Button } from "~/shared/ui/button";

export const NotificationModal = () => {
  return (
    <Button variant={"outline"} className="w-10 h-10">
      <BellIcon />
    </Button>
  );
};
