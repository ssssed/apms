import Image from "next/image";
import sidebarLogo from "~/shared/assets/logo.svg";
import { Box } from "~/shared/ui/box";

export const Logo = () => {
  return (
    <Box className="p-2.5  flex gap-2">
      <Image src={sidebarLogo} alt="apms" width={24} height={24} />
      <span className="text-2xl font-bold relative">
        APMS
        <span className="absolute -top-1 -right-6 text-xs opacity-40 rotate-[18deg] font-normal">
          beta
        </span>
      </span>
    </Box>
  );
};
