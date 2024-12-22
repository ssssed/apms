import { RegisterForm } from "~/features/register";
import { Page } from "~/shared/ui/page";
import { Typography } from "~/shared/ui/typography";
import { RegisterSliderSection } from "./slider";
import { AlreadyHaveAccount } from "./already-have-account";

export default function RegisterPage() {
  return (
    <Page className="flex justify-between items-center pt-[28px]">
      <div className="flex flex-col gap-8 max-w-[434px] w-full">
        <div className="flex flex-col gap-2.5">
          <Typography as="h1" weight={"bold"} size={"title"} view={"primary"}>
            Регистрация
          </Typography>
          <Typography as="h2" size={"xs"} view={"blured"} font={"poppins"}>
            Мы можем назначать задания, устанавливать сроки и отслеживать
            прогресс без особых усилий.
          </Typography>
        </div>
        <RegisterForm />
        <AlreadyHaveAccount />
      </div>
      <RegisterSliderSection />
    </Page>
  );
}
