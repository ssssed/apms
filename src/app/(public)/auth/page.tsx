import { LoginForm } from "~/features/login";
import { Page } from "~/shared/ui/page";
import { Typography } from "~/shared/ui/typography";
import { LoginSliderSection } from "./slider";
import { DontHaveAccount } from "./dont-have-account";

export default function AuthPage() {
  return (
    <Page className="flex justify-between items-center pt-[28px]">
      <div className="flex flex-col gap-8 max-w-[434px] w-full">
        <div className="flex flex-col gap-2.5">
          <Typography as="h1" weight={"bold"} size={"title"} view={"primary"}>
            С возвращением!
          </Typography>
          <Typography as="h2" size={"xs"} view={"blured"} font={"poppins"}>
            Мы можем назначать задания, устанавливать сроки и отслеживать
            прогресс без особых усилий.
          </Typography>
        </div>
        <LoginForm />
        <DontHaveAccount />
      </div>
      <LoginSliderSection />
    </Page>
  );
}
