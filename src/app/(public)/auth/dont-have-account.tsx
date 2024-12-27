import Link from "next/link";
import { ROUTER } from "~/shared/lib/router";
import { Typography } from "~/shared/ui/typography";

export const DontHaveAccount = () => {
  return (
    <div className="text-center">
      <Typography view="blured" size={"lg"}>
        Нет аккаунта?{" "}
        <Typography
          as="span"
          view={"primary"}
          font={"poppins"}
          size={"lg"}
          weight={"bold"}
        >
          <Link href={ROUTER.pages.REGISTER}>Создать аккаунт</Link>
        </Typography>
      </Typography>
    </div>
  );
};
