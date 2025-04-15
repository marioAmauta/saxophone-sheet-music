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
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "@/lib/zod-schemas";

import { FormButtonLoading } from "@/components/form-button-loading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm() {
  const t = useTranslations("ForgotPasswordForm");

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema(t)),
    defaultValues: {
      email: ""
    }
  });

  async function onSubmit({ email }: ForgotPasswordSchemaType) {
    startTransition(async () => {
      await authClient.forgetPassword(
        {
          email,
          redirectTo: AppRoutes.resetPasswordPage
        },
        {
          onSuccess: () => {
            router.push(AppRoutes.resetMailSentPage);
          },
          onError: ({ error }) => {
            toast.error(error.message);
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email.label")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("email.placeholder")}
                  data-cy={DATA_CY_ELEMENTS.loginForm.email}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4">
          <FormButtonLoading type="submit" className="w-full" loading={isPending}>
            {t("submitButton")}
          </FormButtonLoading>
        </div>
      </form>
    </Form>
  );
}
