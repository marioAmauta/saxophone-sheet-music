"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRouter } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { authClient } from "@/lib/auth-client";
import { DATA_CY_ELEMENTS } from "@/lib/constants";
import { registerSchema, RegisterSchemaType } from "@/lib/zod-schemas";

import { useAfterLoginRedirect } from "@/hooks/use-after-login-redirect";

import { LoadingButton } from "@/components/loading-button";
import { PasswordInput } from "@/components/password-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const t = useTranslations("RegisterForm");

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const { redirectLink, removeRedirectLink } = useAfterLoginRedirect();

  async function onSubmit(data: RegisterSchemaType) {
    startTransition(async () => {
      const parsedRegisterData = registerSchema(t).safeParse(data);

      if (!parsedRegisterData.success) {
        toast.error(t("invalidCredentials"));

        return;
      }

      const { name, email, password } = parsedRegisterData.data;

      await authClient.signUp.email(
        {
          name,
          email,
          password
        },
        {
          onSuccess: () => {
            router.replace(redirectLink || AppRoutes.homePage);
            router.refresh();
          },
          onError: ({ error }) => {
            switch (error.code as keyof typeof authClient.$ERROR_CODES) {
              case "USER_ALREADY_EXISTS": {
                toast.error(t("email.alreadyUsedEmail"));

                return;
              }
              case "PASSWORD_TOO_SHORT": {
                toast.error(t("passwordTooShort"));

                return;
              }
            }
          }
        }
      );

      removeRedirectLink();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("name.placeholder")} data-cy={DATA_CY_ELEMENTS.registerForm.name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email.label")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("email.placeholder")}
                  data-cy={DATA_CY_ELEMENTS.registerForm.email}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password.label")}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={t("password.placeholder")}
                  data-cy={DATA_CY_ELEMENTS.registerForm.password}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("confirmPassword.label")}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={t("confirmPassword.placeholder")}
                  data-cy={DATA_CY_ELEMENTS.registerForm.confirmPassword}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4">
          <LoadingButton
            type="submit"
            className="w-full"
            loading={isPending}
            data-cy={DATA_CY_ELEMENTS.registerForm.submitButton}
          >
            {t("registerSubmit")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
