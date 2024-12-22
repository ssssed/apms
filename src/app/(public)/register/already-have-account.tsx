import Link from "next/link";
import { ROUTER } from "~/shared/lib/router";
import { Typography } from "~/shared/ui/typography";

export const AlreadyHaveAccount = () => {
  return (
    <div className="text-center">
      <Typography view="blured" size={"lg"}>
        Уже есть аккаунт?{" "}
        <Typography
          as="span"
          view={"primary"}
          font={"poppins"}
          size={"lg"}
          weight={"bold"}
        >
          <Link href={ROUTER.pages.AUTH}>Войти</Link>
        </Typography>
      </Typography>
    </div>
  );
};
