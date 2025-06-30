import { Search, Download, BookOpen, Users, Heart, Handshake } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";

import { ContributeButton } from "@/components/contribute-button";
import { GithubIcon } from "@/components/icons";
import { SectionContainer } from "@/components/layout/sections";
import { TypographyH1, TypographyH2, TypographyMuted } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { LoginButton } from "./login-button";

export default function HomePage() {
  const t = useTranslations("HomePage");

  const cards: { translationKey: string; Icon: typeof Search }[] = [
    {
      translationKey: "search",
      Icon: Search
    },
    {
      translationKey: "favorites",
      Icon: Heart
    },
    {
      translationKey: "contribute",
      Icon: Handshake
    },
    {
      translationKey: "multipleGenres",
      Icon: BookOpen
    },
    {
      translationKey: "freeDownloads",
      Icon: Download
    }
  ];

  return (
    <>
      <div className="bg-muted">
        <SectionContainer>
          <TypographyH1>{t("heroSection.title")}</TypographyH1>
          <TypographyMuted className="text-base md:text-xl">{t("heroSection.description")}</TypographyMuted>
          <div className="flex gap-4">
            <Link href={AppRoutes.songsPage} className={buttonVariants()}>
              {t("heroSection.browseLibraryButton")}
            </Link>
            <ContributeButton />
            <LoginButton />
          </div>
        </SectionContainer>
      </div>
      <SectionContainer>
        <TypographyH2>{t("featuresSection.title")}</TypographyH2>
        <TypographyMuted className="text-base md:text-xl">{t("featuresSection.description")}</TypographyMuted>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map(({ Icon, translationKey }) => (
            <Card key={`${translationKey}-card`}>
              <CardHeader>
                <Icon className="mb-2 size-10" />
                <CardTitle>{t(`featuresSection.features.${translationKey}.title` as TranslationKey)}</CardTitle>
                <CardDescription>
                  {t(`featuresSection.features.${translationKey}.description` as TranslationKey)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </SectionContainer>
      <div className="bg-muted">
        <SectionContainer>
          <TypographyH2>{t("openSourceSection.title")}</TypographyH2>
          <TypographyMuted className="text-base md:text-xl">{t("openSourceSection.description")}</TypographyMuted>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <GithubIcon className="size-5 fill-current" />
              <span>{t("openSourceSection.p1")}</span>
            </li>
            <li className="flex items-center gap-2">
              <Users className="size-5" />
              <span>{t("openSourceSection.p2")}</span>
            </li>
          </ul>
          <a href={AppRoutes.projectOnGithub} target="_blank" rel="noopener noreferrer" className={buttonVariants()}>
            <GithubIcon className="size-4 fill-current" />
            <span>{t("openSourceSection.buttonLabel")}</span>
          </a>
        </SectionContainer>
      </div>
      <SectionContainer>
        <TypographyH2>{t("ctaSection.title")}</TypographyH2>
        <TypographyMuted className="text-base md:text-xl">{t("ctaSection.description")}</TypographyMuted>
        <div className="flex gap-4">
          <Link href={AppRoutes.songsPage} className={buttonVariants()}>
            {t("ctaSection.buttonLabel")}
          </Link>
          <ContributeButton />
        </div>
      </SectionContainer>
    </>
  );
}
