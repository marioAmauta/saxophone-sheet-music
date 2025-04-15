"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRouter } from "@/i18n/navigation";

import { AppRoutes } from "@/lib/app-routes";
import { authClient } from "@/lib/auth-client";
import { DATA_CY_ELEMENTS } from "@/lib/constants";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/lib/zod-schemas";

import { FormButtonLoading } from "@/components/form-button-loading";
import { PasswordInput } from "@/components/password-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export function ResetPasswordForm() {
  const t = useTranslations("RegisterForm");

  const router = useRouter();

  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema(t)),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });

  async function onSubmit({ password }: ResetPasswordSchemaType) {
    startTransition(async () => {
      const token = searchParams.get("token");

      if (!token) {
        toast.error(t("resetPasswordError"));

        return;
      }

      await authClient.resetPassword(
        {
          newPassword: password,
          token
        },
        {
          onSuccess: () => {
            router.replace(AppRoutes.loginPage);
          },
          onError: () => {
            toast.error(t("resetPasswordError"));
          }
        }
      );
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-4">
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
          <FormButtonLoading type="submit" className="w-full" loading={isPending}>
            {t("updatePassword")}
          </FormButtonLoading>
        </div>
      </form>
    </Form>
  );
}
